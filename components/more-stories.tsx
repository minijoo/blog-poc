import PostPreview from "./post-preview";
import type Post from "../interfaces/post";
import { useEffect, useLayoutEffect, useState } from "react";
import Header from "./header";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  posts: Post[];
  travel: number;
};

const MoreStories = ({ posts, travel }: Props) => {
  const [windowWidth, setWindowWidth] = useState(1);

  useEffect(() => {
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
    <section className="w-full max-w-xl fixed left-1/2 -translate-x-1/2 text-center">
      <Header />
      <div className="relative w-full">
        {coords.map((coord, index) => (
          <div
            className="absolute w-full"
            key={index}
            style={{
              left: Math.round(coord[0] * 10000) / 10000,
              top: Math.round(coord[1] * 10000) / 10000,
            }}
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

            <div className="scale-[1.01] h-[35vh]">
              <CoverImage
                title={posts[index].title}
                src={posts[index].coverImage}
                slug={posts[index].slug}
              />
            </div>
            <div className="mt-2 text-lg">
              Posted on{" "}
              <DateFormatter dateString={posts[index].date} useShortForm />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
