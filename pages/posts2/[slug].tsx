import { useRouter } from "next/router";
import Container from "../../components/container";
import PostBody2 from "../../components/post-body-2";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import Footer from "../../components/footer";
import { useLayoutEffect, useRef } from "react";
import Author from "../../interfaces/author";
import { bundleMDX } from "mdx-bundler";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import GalleryItem from "../../interfaces/galleryItem";
import { injectGalleryMdx } from "../../lib/utils";
import { JordysAPI } from "../../lib/jordys-api";
import CoverImage from "../../components/cover-image-for-post";

const Jordys_API = new JordysAPI(process.env.IP); // we can reference env var here because it will be used only at build time

type Props = {
  code: string;
  encryptedCode: string;
  metadata: {
    title: string;
    date: string;
    coverImage: string;
    excerpt: string;
    author: Author;
    private: boolean;
  };
  gallery: GalleryItem[];
  slug: string;
};

export default function Post({
  code,
  encryptedCode,
  metadata,
  gallery,
  slug,
}: Props) {
  useLayoutEffect(() => {
    document.getElementsByTagName("html")[0].classList.remove("no-scrollbar");
    //   // this adds scrollbar to the page
  }, []);

  const router = useRouter();
  const headerTitle = `${metadata.title} | Jordy's Site`;
  const mainRef = useRef(null);
  return (
    <Layout preview={false}>
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <Head>
            <title>{headerTitle}</title>
            <meta property="og:image" content={metadata.coverImage} />
          </Head>
          <div className="max-w-2xl mb-8 mx-auto">
            <CoverImage title={metadata.title} src={metadata.coverImage} />
          </div>
          <Container>
            <PostHeader
              title={metadata.title}
              date={metadata.date}
              author={metadata.author}
            />
            <article className="pb-10">
              <PostBody2 code={code} isEncrypted={metadata.private} />
            </article>
          </Container>
        </>
      )}
      <div className="fixed bottom-0 w-screen flex flex-col gap-y-2 justify-items-center place-items-center">
        <Footer />
      </div>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = await Jordys_API.retrievePostWithToken(params.slug);

  const author: Author = {
    name: "Anonymous",
    picture: "",
  };

  if (post.author) {
    const authors = await Jordys_API.getAuthorInfos([post.author.toString()]);
    if (authors && authors.length) {
      author.name = authors[0].username;
      if (authors[0].picture) author.picture = authors[0].picture;
    }
  }

  const galleryByName = new Map();
  post.gallery.forEach((item) =>
    galleryByName.set(item.name.toLowerCase(), item)
  );

  let mdxBody = injectGalleryMdx(post.body, galleryByName);

  mdxBody = mdxBody.replaceAll("@preview-escape\n", "");

  const result = await bundleMDX({
    source: mdxBody,
    mdxOptions(options: Record<string, any>) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkMath];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeKatex];
      return {
        ...options,
        providerImportSource: "@mdx-js/react",
      };
    },
  });

  let code;
  if (post.private) {
    const KEY = parseInt(process.env.PRIVATE_PAGE_KEY);

    code = "";

    for (let i = 0; i < result.code.length; i++) {
      const ch = result.code.charCodeAt(i);
      code += String.fromCharCode(ch ^ KEY);
    }
  } else {
    code = result.code;
  }

  return {
    props: {
      code,
      metadata: {
        title: post.title,
        author,
        coverImage: post.cover_url || "",
        date: post.date,
        excerpt: post.excerpt,
        private: !!post.private,
      },
      gallery: [],
    } as Props,
  };
}

export async function getStaticPaths() {
  const allPosts = await Jordys_API.retrieveAllPostsWithToken();
  return {
    paths: allPosts.map((post) => {
      return {
        params: {
          slug: post._id,
        },
      };
    }),
    fallback: false,
  };
}
