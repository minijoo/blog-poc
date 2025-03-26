import getAllPosts from "../../components/testData";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody2 from "../../components/post-body-2";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import type PostType from "../../interfaces/post";
import Footer from "../../components/footer";
import { useEffect, useLayoutEffect } from "react";
import Author from "../../interfaces/author";
import { bundleMDX } from "mdx-bundler";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import GalleryItem from "../../interfaces/galleryItem";
import { dbPostToStaticPostContent } from "../../lib/utils";

type Props = {
  jbBody: string;
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

export default function Post({ jbBody, code, metadata, gallery, slug }: Props) {
  useEffect(() => {
    document.getElementsByTagName("html")[0].classList.remove("no-scrollbar");
    // this adds scrollbar to the page
  });
  const router = useRouter();
  const headerTitle = `${metadata.title} | Jordy's Site`;
  return (
    <Layout preview={false}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="pb-10">
              <Head>
                <title>{headerTitle}</title>
                <meta property="og:image" content={metadata.coverImage} />
              </Head>
              <PostHeader
                title={metadata.title}
                coverImage={metadata.coverImage}
                date={metadata.date}
                author={metadata.author}
              />
              <PostBody2 code={code} gallery={gallery} />
              <div className="h-[50vh] bg-radial-[at_50%_100%] from-blue-400 to-white to-65% items-end flex text-center">
                <div className="w-full text-white">Into the nothing-ness</div>
              </div>
            </article>
          </>
        )}
      </Container>
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
  const allPosts = await getAllPosts();
  const post = allPosts.find((el) => el._id === params.slug);

  const [finalBody, imgOrder] = dbPostToStaticPostContent(post.body);

  const galleryItemByName: Map<string, GalleryItem> = new Map();
  post.gallery?.forEach((el) => {
    if (el.type === "video") {
      //hard-code for now
      galleryItemByName.set(el.name, {
        type: "video",
        name: el.name,
        path: el.url,
        video: {
          path: el.url,
          type: el.mimetype === "video/quicktime" ? "video/mp4" : el.mimetype,
        },
      });
    } else if (el.type === "image") {
      galleryItemByName.set(el.name, {
        name: el.name,
        path: el.url,
      });
    } else {
      console.log(
        "Gallery item",
        el.name,
        "is of a type that is not supported. Skipping.."
      );
    }
  });
  const finalGallery = imgOrder.reduce((prev, el) => {
    console.log(el);
    const itemFound = galleryItemByName.get(el);
    if (itemFound) {
      prev.push(itemFound);
    } else {
      console.log("gallery item not found for img name", el);
    }
    return prev;
  }, []);
  console.log("FINAL");
  console.log(finalGallery);
  const result = await bundleMDX({
    source: finalBody,
    mdxOptions(options: Record<string, any>) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkMath];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeKatex];
      return {
        ...options,
        providerImportSource: "@mdx-js/react",
      };
    },
  });
  return {
    props: {
      jbBody: post.body,
      code: result.code,
      metadata: {
        title: post.title,
        author: {
          name: "Jordy",
        },
        coverImage: "",
        date: post.date.toISOString(),
        excerpt: post.excerpt,
      },
      gallery: finalGallery,
    } as Props,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts();
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
