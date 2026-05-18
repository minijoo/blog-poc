import { useState } from "react";
import { ColumnsPhotoAlbum, Photo } from "react-photo-album";
import { SlideVideo } from "yet-another-react-lightbox";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"));

// Lightbox plugins
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";

import { FaRegCirclePlay } from "react-icons/fa6";
import dynamic from "next/dynamic";

type MyPhoto = Photo & {
  usePlayWatermark?: boolean;
};

const convertToAlbumThumb = (slide: SlideVideo): MyPhoto => {
  const simage: MyPhoto = {
    usePlayWatermark: true,
    src: slide.poster,
    width: slide.width,
    height: slide.height,
  };
  return simage;
};

export default function PhotoGallery({ slides }) {
  const [index, setIndex] = useState(-2);
  // initialized to -2 to indicate first load.

  const albumThumbs: MyPhoto[] = slides
    .map((sld) => (sld.type === "video" ? convertToAlbumThumb(sld) : sld))

  slides.forEach(async (slide) => {
    const url = slide.src as string;
    if (url) {
      const lastSlashIdx = url.lastIndexOf('/');
      const path = url.substring(0, lastSlashIdx);
      const name = url.substring(lastSlashIdx + 1);
      const origUrl = `${path}/original/${name}`
      const resp = await fetch(origUrl, { method: "HEAD" });
      if (resp.status === 200) {
        slide.downloadUrl = origUrl
      }
    }
  });

  return (
    <>
      <ColumnsPhotoAlbum
        photos={albumThumbs}
        columns={(containerWidth) => {
          if (containerWidth < 400) return 3;
          if (containerWidth < 800) return 4;
          return 5;
        }}
        onClick={({ index }) => setIndex(index)}
        render={{
          extras: (_, { photo }) =>
            photo.usePlayWatermark ? (
              <div className="absolute text-4xl text-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <FaRegCirclePlay />
              </div>
            ) : (
              <></>
            ),
        }}
      />
      {index !== -2 && (
        <Lightbox
          styles={{
            captionsTitleContainer: { display: "none" },
          }}
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
            maxZoomPixelRatio: 2,
            doubleClickMaxStops: 1,
          }}
          captions={{
            descriptionTextAlign: "center",
          }}
          plugins={[Counter, Captions, Zoom, Fullscreen, Video, Download]}
          counter={{
            container: {
              style: {
                top: 0,
                bottom: "unset",
                left: 0,
              },
            },
          }}
        />
      )}
    </>
  );
}
