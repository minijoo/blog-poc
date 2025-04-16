import { useEffect, useState } from "react";
import Header from "./header";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PreviewPost } from "../interfaces/preview-post";
import { Textfit } from "react-textfit";

type Props = {
  posts: PreviewPost[];
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
  const coords = thetas
    .map((theta) => convertCoords(theta + travel, radius))
    .reduce(
      (prev, curr) => {
        if (--prev.countdown >= 0) prev.arr.push(curr);
        return prev;
      },
      { countdown: posts.length, arr: [] }
    ).arr;
  return (
    <section className="w-full h-dvh max-w-xl fixed left-1/2 -translate-x-1/2 text-center flex flex-col">
      <Header />
      <div className="relative w-full grow mb-10">
        {coords.map((coord, index) => (
          <div
            className="absolute w-full h-full flex flex-col hover:cursor-pointer"
            key={index}
            style={{
              left: Math.round(coord[0] * 10000) / 10000,
              top: Math.round(coord[1] * 10000) / 10000,
            }}
            onClick={(e) => {
              window.location.href = `/posts2/${posts[index].slug}`;
              e.preventDefault();
            }}
          >
            <div className="grow-0 font-bold leading-none pr-1">
              <Textfit mode="single" max={175}>
                <em>{posts[index].metadata.title}</em>
              </Textfit>
            </div>
            <div className="grow px-2 pt-2 text-black text-left">
              <Textfit
                className="leading-none"
                mode="multi"
                max={400}
                throttle={2000}
                style={{ maxHeight: "100%", height: "100%" }}
              >
                {posts[index].metadata.excerpt}
              </Textfit>
            </div>

            {posts[index].metadata.coverImage ? (
              <div className="grow-0 scale-100 h-2/5 flex-none">
                <CoverImage
                  title={posts[index].metadata.title}
                  src={posts[index].metadata.coverImage}
                  slug={posts[index].slug}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="grow-0 mt-2 text-lg">
              Posted on{" "}
              <DateFormatter
                dateString={posts[index].metadata.date}
                useShortForm
              />
              ; by {posts[index].metadata.author_name}
            </div>
          </div>
        ))}
        <div className="absolute bottom-0 right-0 w-12 mb-2 text-xl text-white text-center bg-neutral-500/75 rounded-md">
          {Math.ceil(travel / 60)} / 6
        </div>
      </div>
    </section>
  );
};

export default MoreStories;
