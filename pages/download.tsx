import { useState } from "react";
import cn from "classnames";
import hhPhotos from "../galleries/hh-photos";
import PhotoGallery from "../components/photo-gallery";

const url0 =
  "https://public--asia.s3.ap-northeast-2.amazonaws.com/JYK+Scan+Images.zip";

export default function DownloadPage() {
  const [showing, setShowing] = useState(false);
  return (
    <>
      <div className="p-5">
        <button
          className={cn(
            "m-5 bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white",
            { hidden: showing }
          )}
          onClick={() => setShowing(true)}
        >
          Show photos
        </button>
        <div className={cn("", { hidden: !showing })}>
          <PhotoGallery slides={hhPhotos} />
        </div>
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
