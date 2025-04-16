import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
// import CoverImage from "./cover-image";
import CoverImageForPost from "./cover-image-for-post";
import PostTitle from "./post-title";
import type Author from "../interfaces/author";

type Props = {
  title: string;
  coverImage?: string;
  date: string;
  author: Author;
};

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      {coverImage ? (
        <div className="md:max-w-2xl mb-8 mx-auto">
          <CoverImageForPost title={title} src={coverImage} />
        </div>
      ) : (
        <></>
      )}
      <div className="md:max-w-2xl md:mx-auto flex w-full">
        <div className="block mb-6 flex-1">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg text-right flex-1">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
