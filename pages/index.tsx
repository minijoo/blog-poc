import ContainerHome from "../components/container-home";
import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import Head from "next/head";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { JordysAPI } from "../lib/jordys-api";
import Author from "../interfaces/author";
import { PreviewPost } from "../interfaces/preview-post";

const Jordys_API = new JordysAPI(process.env.IP); // we can reference env var here because it will be used only at build time

type Props = {
  allPosts: PreviewPost[];
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

  useEffect(() => {
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
    scrollDivs.push(
      <div key={i} className="h-[600px] snap-start snap-always"></div>
    );
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
        <div className="fixed bottom-0 w-full flex flex-col gap-y-2 place-items-center">
          <Footer />
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allApiPosts = await Jordys_API.retrieveAllPostsWithToken();
  const apiPosts = allApiPosts
    .filter((p) => !p.private)
    .sort((postA, postB) => Date.parse(postB.date) - Date.parse(postA.date));
  if (!apiPosts.length) {
    return { props: { allPosts: [] } };
  }
  const authors = await Jordys_API.getAuthorInfos(
    apiPosts.map((p) => p.author?.toString()).filter((a) => !!a)
  );
  const authorMap = new Map<string, Author>();
  authors.forEach((author) =>
    authorMap.set(author._id.toString(), {
      name: author.username,
      picture: author.picture,
    })
  );
  authorMap.set(undefined, { name: "Anonymous", picture: "" });

  const allPosts: PreviewPost[] = apiPosts.map((apiPost) => ({
    metadata: {
      title: apiPost.title,
      date: apiPost.date,
      coverImage: apiPost.cover_url || "",
      author_name: authorMap.get(apiPost.author?.toString()).name,
      author_picture: authorMap.get(apiPost.author?.toString()).picture,
      excerpt: apiPost.excerpt,
    },
    slug: apiPost._id,
  }));

  return {
    props: { allPosts },
  };
};
