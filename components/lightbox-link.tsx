import { useState } from "react";
import { IndexInfo } from "typescript";
import Lightbox, { Slide } from "yet-another-react-lightbox";

// Lightbox plugins
import Download from "yet-another-react-lightbox/plugins/download";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export type LightboxData = {
  slideIndexById: Map<string, number>;
  slides: Slide[];
};

type Props = {
  data: LightboxData;
  picId: string;
  children: any;
};

export default function PhotoGallery({ data, picId, children }: Props) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <a
        className="lightbox"
        onClick={() => {
          setIndex(data.slideIndexById[picId]);
        }}
      >
        {children}
      </a>
      <Lightbox
        slides={data.slides}
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
