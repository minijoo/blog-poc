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
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
        }}
      >
        <div className="h-full backdrop-blur-sm bg-white/50 px-5 md:px-10">
          {/* <Textfit
            mode="multi"
            max={1000} */}
          <div
            style={{ height: "144px", fontSize: "36px" }}
            className="text-center tracking-tighter flex place-items-center"
          >
            {title}
          </div>
          {/* </Textfit> */}
        </div>
      </div>
    </div>
  );
  return <div className="sm:mx-0">{image}</div>;
};

export default CoverImage;
