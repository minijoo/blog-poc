import { useRouter } from "next/router";
import Container from "../../components/container";
import PostBody2 from "../../components/post-body-2";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import Footer from "../../components/footer";
import { useEffect, useRef } from "react";
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
  metadata: {
    title: string;
    date: string;
    coverImage: string;
    excerpt: string;
    author: Author;
  };
  gallery: GalleryItem[];
  slug: string;
};

export default function Post({ code, metadata, gallery, slug }: Props) {
  useEffect(() => {
    document.getElementsByTagName("html")[0].classList.remove("no-scrollbar");
    // this adds scrollbar to the page
  });
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
          <div className="md:max-w-2xl mb-8 mx-auto">
            <CoverImage title={metadata.title} src={metadata.coverImage} />
          </div>
          <Container>
            <PostHeader
              title={metadata.title}
              coverImage={metadata.coverImage}
              date={metadata.date}
              author={metadata.author}
            />
            <article className="pb-10">
              <PostBody2 code={code} />
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

  const quickAuthorMap: Map<string, Author> = new Map();
  quickAuthorMap.set("seconduser@test.com", {
    name: "Bird",
    picture: "../assets/blog/authors/bird.jpg",
  });
  quickAuthorMap.set("firstuser@test.com", {
    name: "Jordy",
    picture: "../assets/blog/authors/jord.jpg",
  });

  return {
    props: {
      code: result.code,
      metadata: {
        title: post.title,
        author: quickAuthorMap.get(
          post.author_email ? post.author_email : "firstuser@test.com"
        ),
        coverImage: post.cover_url || "",
        date: post.date,
        excerpt: post.excerpt,
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
