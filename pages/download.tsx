import { useLayoutEffect, useRef, useState } from "react";
import cn from "classnames";
import hhPhotos from "../galleries/hh-photos";
import PhotoGallery from "../components/photo-gallery";
import TextFit from "textfit";

const url0 =
  "https://public--asia.s3.ap-northeast-2.amazonaws.com/JYK+Scan+Images.zip";

export default function DownloadPage() {
  const ref = useRef();

  useLayoutEffect(() => {
    console.log(ref.current);
    TextFit(ref.current, { multiLine: true });
  }, []);

  const [showing, setShowing] = useState(false);

  return (
    <>
      <div ref={ref} className="w-[60vw] h-32 text-justify">
        this is a piece of text that is I mean this works? what does multiline
        do exactly
      </div>
    </>
  );
  // </div>
  // return <div className="p-5">
  //   <a href={url0} target="_blank"
  //     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //   >
  //     Download Medical Scans
  //   </a>
  // </div>;
}
