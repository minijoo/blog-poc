import PostPreview from "./post-preview";
import type Post from "../interfaces/post";
import { useLayoutEffect, useState } from "react";
import Header from "./header";
import CoverImage from "./cover-image";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  const [windowWidth, setWindowWidth] = useState(1);
  const [travel, setTravel] = useState(0);

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
    const onScroll = () => {
      calculateScrollAmount();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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

  const convertCoords = (theta: number, radius: number) => {
    return [
      radius + radius * Math.cos((theta * Math.PI) / 180),
      radius * Math.sin((theta * Math.PI) / 180),
    ];
  };

  const radius = windowWidth * 2;
  const thetas = [180, 240, 300, 0, 60, 120];
  const coords = thetas.map((theta) => convertCoords(theta + travel, radius));
  return (
    <section className="w-auto w-full fixed left-1/2 -translate-x-1/2 text-center">
      <Header />
      <div className="relative w-full h-screen">
        {coords.map((coord, index) => (
          <div
            className="absolute w-screen"
            key={index}
            style={{ left: coord[0], top: coord[1] }}
          >
            <div className="px-2">
              <PostPreview
                key={posts[index].slug}
                title={posts[index].title}
                coverImage={posts[index].coverImage}
                date={posts[index].date}
                author={posts[index].author}
                slug={posts[index].slug}
                excerpt={posts[index].excerpt}
              />
            </div>

            <div className="scale-[1.01]">
              <CoverImage
                title={posts[index].title}
                src={posts[index].coverImage}
                slug={posts[index].slug}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
