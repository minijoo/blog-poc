import cn from "classnames";
import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import type Author from "../interfaces/author";
import { Textfit } from "react-textfit";
import { useRef, useState } from "react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  const [openSlug, setOpenSlug] = useState("");
  const inlineStyle = { height: "100%" };
  return (
    <div className="flex">
      <div className="w-full h-full relative overflow-hidden">
        <div
          className={cn(
            "px-2 md:px-0 duration-500 absolute top-0 w-full h-full text-left flex items-center justify-between",
            {
              "translate-x-full": slug !== openSlug,
            }
          )}
        >
          <div className="px-1 md:px-0 w-5/6 h-full">
            <Textfit style={inlineStyle} mode="multi" max={10000}>
              <em>{excerpt}</em>
            </Textfit>
          </div>
          <div className="text-right w-32">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        </div>
        <div
          className={cn("text-3xl w-full leading-snug duration-500", {
            "translate-negatively-full": slug === openSlug,
          })}
        >
          <Link as={`/posts/${slug}`} href="/posts/[slug]" className="">
            <Textfit mode="single" max={1000}>
              {title}
            </Textfit>
          </Link>
        </div>
        <Link as={`/posts/${slug}`} href="/posts/[slug]" className="">
          <div
            className="w-full h-full absolute top-0"
            onMouseMove={() => {
              setOpenSlug(slug);
            }}
            onMouseLeave={() => {
              setOpenSlug("");
            }}
          ></div>
        </Link>
      </div>
      <div className="hidden ml-3 md:px-0 w-28 h-full items-center md:flex place-content-center">
        <DateFormatter dateString={date} useKanji />
      </div>
      <div className="md:hidden px-1 md:px-0 w-28 h-full items-center flex place-content-center">
        <DateFormatter dateString={date} useShortForm />
      </div>
    </div>
  );
};

// How above divs work: 3 divs exist on one level: (1) div with what comes in from the right containing
// excert and author; (2) div with the headline that starts visible; (3) div that sits on top,
// positioned aboslutely and never moves (i.e. never translated). This last div contains the onMove
// listener and the clickable link.

export default PostPreview;
