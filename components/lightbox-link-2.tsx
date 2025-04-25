import dynamic from "next/dynamic";
import { useState } from "react";
import { IndexInfo } from "typescript";
import { Slide } from "yet-another-react-lightbox";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"));

// Lightbox plugins
import Download from "yet-another-react-lightbox/plugins/download";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type Props = {
  children: any;
  slide: Slide;
};

export default function LightboxLink({ slide, children }: Props) {
  const [open, setOpen] = useState<boolean>();

  return (
    <>
      <a
        className="lightbox"
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open !== undefined && (
        <Lightbox
          slides={[slide]}
          open={open}
          index={0}
          close={() => setOpen(false)}
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
            maxZoomPixelRatio: 0.5,
            doubleClickMaxStops: 1,
          }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
          plugins={[Zoom, Video, Download]}
        />
      )}
    </>
  );
}
