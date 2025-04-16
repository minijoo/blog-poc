import cn from "classnames";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import type Author from "../interfaces/author";

type Props = {
  title: string;
  date: string;
  author_name: string;
  coverImage: string;
  slug: string;
  index: number;
};

const PostPreviewStatic = ({
  title,
  date,
  author_name,
  slug,
  coverImage,
}: Props) => {
  return (
    <Link as={`/posts2/${slug}`} href="/posts2/[slug]">
      <div
        style={{
          backgroundImage: `url(${coverImage})`,
        }}
        className="bg-cover bg-center min-h-16 duration-200 active:translate-x-[-1.5rem] md:active:translate-x-[-5.5rem] active:-rotate-[4deg] active:scale-75"
      >
        <div className="pl-3 pr-2 py-2 flex flex-row gap-2 bg-white/60 min-h-16">
          <div
            className={cn("grow font-bold text-3xl leading-snug duration-500")}
          >
            {title}
          </div>
          {/* <div className="">
            <span className="text-xs"> (by {author_name})</span>
          </div> */}
          <div className="text-sm">
            <DateFormatter dateString={date} useKanji />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostPreviewStatic;
