import { useEffect, useLayoutEffect, useRef } from "react";
import textFit from "textfit";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const ref = useRef(undefined);
  useEffect(() => {
    textFit(ref.current, {
      multiLine: true,
      alignVert: true,
    });
  });
  const image = (
    <div>
      <div
        className="w-full h-36 bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
        }}
      >
        <div className="h-full w-full bg-black/40 active:bg-transparent hover:bg-transparent px-5 md:px-10">
          <div
            ref={ref}
            style={{ textAlignLast: "justify" }}
            className="h-36 select-none text-gray-100 text-shadow-lg text-shadow-black text-justify"
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
  return <div className="sm:mx-0">{image}</div>;
};

export default CoverImage;
