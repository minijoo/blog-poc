import { useLayoutEffect, useRef, useState } from "react";

export default function DownloadPage() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    console.log(ref.current);
  }, []);

  const [showing, setShowing] = useState(false);

  return <></>;
  // </div>
  // return <div className="p-5">
  //   <a href={url0} target="_blank"
  //     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //   >
  //     Download Medical Scans
  //   </a>
  // </div>;
}
