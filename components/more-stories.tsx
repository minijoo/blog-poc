import PostPreview from "./post-preview";
import type Post from "../interfaces/post";
import { useLayoutEffect, useState } from "react";
import Header from "./header";
import CoverImage from "./cover-image";

type Props = {
  posts: Post[];
  travel: number;
};

const MoreStories = ({ posts, travel }: Props) => {
  const [windowWidth, setWindowWidth] = useState(1);

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
  });

  const convertCoords = (theta: number, radius: number) => {
    return [
      radius + radius * Math.cos((theta * Math.PI) / 180),
      radius * Math.sin((theta * Math.PI) / 180),
    ];
  };

  const radius = windowWidth * 2;
  const thetas = [180, 120, 60, 0, 300, 240];
  const coords = thetas.map((theta) => convertCoords(theta + travel, radius));
  return (
    <section className="w-full fixed left-1/2 -translate-x-1/2 text-center">
      <Header />
      <div className="relative w-full">
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
