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
  const height = 60; // Later, add variable preview size functionality
  return (
    <div className="relative overflow-hidden">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <div className="font-bold text-3xl leading-snug duration-200">
          <Textfit mode="single" max={1000}>
            {title}
          </Textfit>
        </div>
        <div className="grow">
          <div
            className={`h-[30vh] $h-full $px-2 md:px-0 md:w-full $w-[95vw] text-left flex items-center justify-between`}
          >
            <div className="md:px-2 w-full h-full text-justify">
              <Textfit style={inlineStyle} mode="multi" max={10000}>
                <span className="align-text-bottom">
                  <em>By {author.name === "Jordy" ? "me" : author.name}</em> —
                  <span className="text-gray-600 mx-10">
                    {excerpt} {"("}
                    <DateFormatter dateString={date} useShortForm />
                    {")"}
                  </span>
                </span>
              </Textfit>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostPreview;
