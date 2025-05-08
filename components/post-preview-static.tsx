import cn from "classnames";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import type Author from "../interfaces/author";
import Image from "next/image";

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
      <div className="relative bg-cover bg-center min-h-16 duration-200 hover:translate-x-[-1.5rem] md:hover:translate-x-[-5.5rem] hover:-rotate-[4deg] hover:scale-115 active:translate-x-[-1.5rem] md:active:translate-x-[-5.5rem] active:-rotate-[4deg] active:scale-115 z-49">
        <div className="relative z-49 pl-3 pr-2 py-2 flex flex-row gap-2 bg-white/60 min-h-16">
          <div
            className={cn("grow font-bold text-3xl leading-snug duration-500")}
          >
            {title}
          </div>
          <div className="text-sm">
            <DateFormatter dateString={date} useKanji />
          </div>
        </div>
        <Image
          src={encodeURI(coverImage)}
          alt={title}
          objectFit="cover"
          fill
          className="absolute z-0"
        />
      </div>
    </Link>
  );
};

export default PostPreviewStatic;
