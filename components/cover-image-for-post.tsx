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
      alignHoriz: true,
      alignVert: true,
    });
  });
  const image = (
    <div>
      <div
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
        }}
      >
        <div className="h-full w-full backdrop-blur-sm bg-white/50 px-5 md:px-10">
          <div ref={ref} className="h-36">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
  return <div className="sm:mx-0">{image}</div>;
};

export default CoverImage;
