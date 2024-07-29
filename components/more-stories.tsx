import PostPreview from "./post-preview";
import type Post from "../interfaces/post";
import { useLayoutEffect, useState } from "react";
import Header from "./header";
import { useMediaQuery } from "react-responsive";
import CoverImage from "./cover-image";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  const [windowWidth, setWindowWidth] = useState(1);

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
    const onScroll = () => {
      calculateScrollAmount();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  const calculateScrollAmount = () => {
    let scrollY = window.scrollY;
    setTravel(0 + (scrollY / 600) * 60); // 360 pie, 6 slices, 60 degrees each
    const isChromeIOS = navigator.userAgent.match("CriOS");
    if (scrollX > 12 * 600 && !isChromeIOS) {
      // infinite scroll effect when scrolling down
      window.scroll({
        left: 0,
        // @ts-expect-error
        behavior: "instant",
      });
    }
  };

  const [travel, setTravel] = useState(0);
  const radius = useMediaQuery({ query: "(min-width: 768px)" }) ? 110 : 50; //rems
  const xTransA = radius * Math.cos(travel * (Math.PI / 180));
  const yTransA = radius * Math.sin(travel * (Math.PI / 180));
  const xTransB = radius * Math.cos((60 - travel) * (Math.PI / 180));
  const yTransB = radius * Math.sin((60 - travel) * (Math.PI / 180));
  const xTransC = radius * Math.cos((60 + travel) * (Math.PI / 180));
  const yTransC = radius * Math.sin((60 + travel) * (Math.PI / 180));
  return (
    <section className="w-auto w-full fixed left-1/2 -translate-x-1/2 text-center">
      <Header />
      <div className="`w-[200vw] text-center `left-1/2 absolute `-translate-x-1/2 mx-auto">
        <div
          className="md:px-10 w-screen absolute `left-1/2 `-translate-x-1/2"
          style={{
            transform: `translateX(${radius - xTransA}rem) translateY(${
              -1 * yTransA
            }rem)`,
          }}
        >
          <div className="px-2">
            <PostPreview
              key={posts[0].slug}
              title={posts[0].title}
              coverImage={posts[0].coverImage}
              date={posts[0].date}
              author={posts[0].author}
              slug={posts[0].slug}
              excerpt={posts[0].excerpt}
            />
          </div>

          <div className="scale-[1.01]">
            <CoverImage
              title={posts[0].title}
              src={posts[0].coverImage}
              slug={posts[0].slug}
            />
          </div>
        </div>

        <div
          style={{
            transform: `translateX(${
              radius - xTransB
            }rem) translateY(${yTransB}rem)`,
          }}
          className="h-40 md:px-10 w-screen absolute `left-1/2 `-translate-x-1/2"
        >
          <div className="px-2">
            <PostPreview
              key={posts[1].slug}
              title={posts[1].title}
              coverImage={posts[1].coverImage}
              date={posts[1].date}
              author={posts[1].author}
              slug={posts[1].slug}
              excerpt={posts[1].excerpt}
            />
          </div>
          <div className="scale-[1.01]">
            <CoverImage
              title={posts[1].title}
              src={posts[1].coverImage}
              slug={posts[1].slug}
            />
          </div>
        </div>
        <div
          style={{
            transform: `translateX(${
              radius + xTransC
            }rem) translateY(${yTransC}rem)`,
          }}
          className="h-40 md:px-10 w-screen absolute `left-1/2 `-translate-x-1/2"
        >
          <div className="px-2">
            <PostPreview
              key={posts[2].slug}
              title={posts[2].title}
              coverImage={posts[2].coverImage}
              date={posts[2].date}
              author={posts[2].author}
              slug={posts[2].slug}
              excerpt={posts[2].excerpt}
            />
          </div>
          <div className="scale-[1.01]">
            <CoverImage
              title={posts[2].title}
              src={posts[2].coverImage}
              slug={posts[2].slug}
            />
          </div>
        </div>
        <div
          style={{
            transform: `translateX(${
              radius + xTransA
            }rem) translateY(${yTransA}rem)`,
          }}
          className="h-40 md:px-10 w-screen absolute `left-1/2 `-translate-x-1/2"
        >
          <div className="px-2">
            <PostPreview
              key={posts[3].slug}
              title={posts[3].title}
              coverImage={posts[3].coverImage}
              date={posts[3].date}
              author={posts[3].author}
              slug={posts[3].slug}
              excerpt={posts[3].excerpt}
            />
          </div>
          <div className="scale-[1.01]">
            <CoverImage
              title={posts[3].title}
              src={posts[3].coverImage}
              slug={posts[3].slug}
            />
          </div>
        </div>
        <div
          style={{
            transform: `translateX(${radius + xTransB}rem) translateY(${
              -1 * yTransB
            }rem)`,
          }}
          className="h-40 md:px-10 w-screen absolute `left-1/2 `-translate-x-1/2"
        >
          <div className="px-2">
            <PostPreview
              key={posts[4].slug}
              title={posts[4].title}
              coverImage={posts[4].coverImage}
              date={posts[4].date}
              author={posts[4].author}
              slug={posts[4].slug}
              excerpt={posts[4].excerpt}
            />
          </div>
          <div className="scale-[1.01]">
            <CoverImage
              title={posts[4].title}
              src={posts[4].coverImage}
              slug={posts[4].slug}
            />
          </div>
        </div>
        <div
          style={{
            transform: `translateX(${radius - xTransC}rem) translateY(${
              -1 * yTransC
            }rem)`,
          }}
          className="h-40 md:px-10 w-screen absolute `left-1/2 `-translate-x-1/2"
        >
          <div className="px-2">
            <PostPreview
              key={posts[5].slug}
              title={posts[5].title}
              coverImage={posts[5].coverImage}
              date={posts[5].date}
              author={posts[5].author}
              slug={posts[5].slug}
              excerpt={posts[5].excerpt}
            />
          </div>
          <div className="scale-[1.01]">
            <CoverImage
              title={posts[5].title}
              src={posts[5].coverImage}
              slug={posts[5].slug}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreStories;
