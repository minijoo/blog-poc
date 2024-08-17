import cn from "classnames";
import Image from "next/image";
import PostTitle from "./post-title";
import { Textfit } from "react-textfit";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <div>
      <div
        className="w-full h-36 md:h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
        }}
      >
        <div className="h-full backdrop-blur-sm bg-white/50 px-5 md:px-10 py-6 md:py-12">
          {/* <Textfit
            max={1000}
            className="h-full text-center tracking-tighter flex items-center place-content-center"
          > */}
          {title}
          {/* </Textfit> */}
        </div>
      </div>
    </div>
  );
  return <div className="sm:mx-0">{image}</div>;
};

export default CoverImage;
