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
import Link from "next/link";
import DateFormatter from "../../components/date-formatter";

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
    prevPost: string[]; // [id, title, excerpt, date]
    nextPost: string[];
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

  console.log(metadata.prevPost);
  console.log(metadata.nextPost);

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
              <div className="max-w-2xl mx-auto mb-4">
                <PostBody2 code={code} isEncrypted={metadata.private} />
                <br />
                <hr />
                <br />
                <div>
                  Continue to other posts below or go to the{" "}
                  <a className="decoration-green-600 underline" href="/posts">
                    All Posts
                  </a>{" "}
                  page.
                </div>
                <div className="flex flex-row place-content-around gap-4 md:gap-8 mt-3 mx-2 md:mx-5">
                  {metadata.prevPost.length ? (
                    <Link
                      href={`/posts2/${metadata.prevPost[0]}`}
                      className="contents"
                    >
                      <div className="basis-1/2 relative border-1 border-gray-400 hover:border-black active:border-black rounded p-2">
                        <div>
                          <div className="text-lg md:text-xl underline text-center">
                            {metadata.prevPost[1]}
                          </div>
                          <div className="mb-1.5">{metadata.prevPost[2]}</div>
                        </div>
                        <div className="absolute -bottom-3 left-2 md:left-5 bg-white text-sm">
                          Previous Post
                        </div>
                        <div className="absolute -bottom-3 right-2 md:right-5 bg-white text-sm">
                          <DateFormatter
                            dateString={metadata.prevPost[3]}
                            useShortForm
                          />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}
                  {metadata.nextPost.length ? (
                    <Link
                      href={`/posts2/${metadata.nextPost[0]}`}
                      className="contents"
                    >
                      <div className="basis-1/2 relative border-1 border-gray-400 hover:border-black active:border-black rounded p-2">
                        <div className="text-lg md:text-xl underline text-center">
                          {metadata.nextPost[1]}
                        </div>
                        <div className="mb-1.5">{metadata.nextPost[2]}</div>
                        <div>{metadata.prevPost[3]}</div>
                        <div className="absolute -bottom-3 right-2 md:right-5 bg-white text-sm">
                          Next Post
                        </div>
                        <div className="absolute -bottom-3 left-2 md:left-5 bg-white text-sm">
                          <DateFormatter
                            dateString={metadata.nextPost[3]}
                            useShortForm
                          />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
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
  const resp = await Jordys_API.retrievePostWithToken(params.slug);
  const post = resp.post;

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

  const prevPost = resp.prevPostId
    ? (await Jordys_API.retrievePostWithToken(resp.prevPostId)).post
    : null;
  const nextPost = resp.nextPostId
    ? (await Jordys_API.retrievePostWithToken(resp.nextPostId)).post
    : null;

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
        prevPost: prevPost
          ? [prevPost._id, prevPost.title, prevPost.excerpt, prevPost.date]
          : [],
        nextPost: nextPost
          ? [nextPost._id, nextPost.title, nextPost.excerpt, nextPost.date]
          : [],
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
