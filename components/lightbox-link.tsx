import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

// Lightbox plugins
import Download from "yet-another-react-lightbox/plugins/download";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function PhotoGallery({ slides, ithPhoto, children }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <a
        className="lightbox"
        onClick={() => {
          setIndex(ithPhoto);
        }}
      >
        {children}
      </a>
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        carousel={{
          finite: true,
          padding: 0,
        }}
        animation={{
          fade: 80,
          swipe: 80,
          zoom: 100,
        }}
        controller={{
          closeOnPullDown: true,
        }}
        zoom={{
          maxZoomPixelRatio: 4,
          doubleClickMaxStops: 1,
        }}
        plugins={[Zoom, Video, Download]}
      />
    </>
  );
}
