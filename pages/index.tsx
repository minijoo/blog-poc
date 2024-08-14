import ContainerHome from "../components/container-home";
import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";
import Footer from "../components/footer";
import { useEffect, useLayoutEffect, useState } from "react";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const [travel, setTravel] = useState(0);
  useEffect(() => {
    // start page at second occurrence of first post
    window.scroll({
      top: 3600,
      // @ts-expect-error
      behavior: "instant",
    });
  }, []); // empty array forces this fn to run only once (on load) and not on any other rerenders

  useLayoutEffect(() => {
    document.getElementsByTagName("html")[0].classList.add("no-scrollbar");
    // this removes scrollbar from the page

    window.addEventListener("scroll", calculateScrollAmount);
    return () => window.removeEventListener("scroll", calculateScrollAmount);
  });

  const calculateScrollAmount = () => {
    const n = (window.scrollY / 600) * 60; // turns each 600px scroll div (in index.js) to a 60 pixel scroll.
    setTravel(n < 0 ? 360 + (n % 360) : n % 360);
    const isChromeIOS = navigator.userAgent.match("CriOS");
    if (window.scrollY > 12 * 600 && !isChromeIOS) {
      alert("ha!");
      // infinite scroll effect when scrolling down
      window.scroll({
        top: 0,
        // @ts-expect-error
        behavior: "instant",
      });
    }
  };

  const posts = allPosts;
  const scrollDivs = [];
  for (let i = 0; i < 14; i++) {
    scrollDivs.push(<div className="h-[600px] snap-start snap-always"></div>);
  }
  return (
    <>
      <Layout>
        <Head>
          <title>{`Jordy's Site`}</title>
        </Head>
        <ContainerHome>
          {posts.length > 0 && <MoreStories posts={posts} travel={travel} />}
          <div className="w-full bg-gray">
            {/** These are scroll portions that snap using proximity
             * Each snap is set to half of view height
             * Purposely 13 of them, since homepage shows 6 stories
             * Leaving 7 of them. Another 6 to wrap and show the same 6 stories
             * Leaving 1, which is used for scrolling back to the top.
             */}

            {scrollDivs}
          </div>
        </ContainerHome>
        <div className="fixed bottom-0 w-screen flex flex-col gap-y-2 justify-items-center place-items-center">
          <div className="w-12 text-xl text-white text-center bg-neutral-500/75 rounded-md">
            {Math.ceil(travel / 60)} / 6
          </div>
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
