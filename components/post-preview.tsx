import cn from "classnames";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import type Author from "../interfaces/author";
import { Textfit } from "react-textfit";

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
  const inlineStyle = { height: "100%" };
  return (
    <div className="flex">
      <div className="w-full h-full relative duration-200 overflow-hidden active:translate-x-[-1.5rem] md:active:translate-x-[-5.5rem] active:-rotate-[4deg] active:scale-75">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <div
            className={cn(
              "font-bold text-3xl w-full leading-snug duration-500"
            )}
          >
            <Textfit mode="single" max={1000}>
              {title}
            </Textfit>
          </div>
          <div
            className={cn(
              "px-2 md:px-0 w-full h-20 text-left flex items-center justify-between"
            )}
          >
            <div className="px-1 md:px-2 w-full h-full text-justify">
              <Textfit style={inlineStyle} mode="multi" max={10000}>
                <span>
                  <em>By {author.name === "Jordy" ? "me" : author.name}</em> —
                  <span className="text-gray-600">
                    {excerpt} {"("}
                    <DateFormatter dateString={date} useShortForm />
                    {")"}
                  </span>
                </span>
              </Textfit>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostPreview;
