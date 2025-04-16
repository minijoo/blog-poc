import { useEffect, useLayoutEffect, useRef } from "react";
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
        className="w-full h-42 bg-cover bg-center"
        style={{
          backgroundImage: `url(${encodeURI(src)})`,
        }}
      >
        <div className="h-full w-full backdrop-blur-sm bg-white/40 text-black font-semibold active:text-transparent hover:text-transparent active:bg-transparent hover:backdrop-blur-none active:backdrop-blur-none hover:bg-transparent px-5 md:px-10">
          <Textfit
            mode="multi"
            max={1000}
            style={{ textAlignLast: "left" }}
            className="h-full select-none tracking-normal text-justify grid leading-tight items-center"
          >
            {title}
          </Textfit>
        </div>
      </div>
    </div>
  );
  return <div className="sm:mx-0">{image}</div>;
};

export default CoverImage;
