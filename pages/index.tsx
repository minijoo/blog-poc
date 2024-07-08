import ContainerHome from "../components/container-home";
import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";
import Footer from "../components/footer";
import { useLayoutEffect } from "react";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  useLayoutEffect(() => {
    document.getElementsByTagName("html")[0].classList.add("no-scrollbar");
    // this removes scrollbar from the page
  });
  const posts = allPosts;
  return (
    <>
      <Layout>
        <Head>
          <title>{`Jordy's Site`}</title>
        </Head>
        <ContainerHome>
          {posts.length > 0 && <MoreStories posts={posts} />}
          <div className="w-full bg-gray">
            {/** These are scroll portions that snap using proximity
             * Each snap is set to half of view height
             * Purposely 13 of them, since homepage shows 6 stories
             * Leaving 7 of them. Another 6 to wrap and show the same 6 stories
             * Leaving 1, which is used for scrolling back to the top.
             */}
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
            <div className="h-96 snap-start"></div>
          </div>
        </ContainerHome>
        <div className="fixed bottom-0 w-screen">
          <Footer />
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = await getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
