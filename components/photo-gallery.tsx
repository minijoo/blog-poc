import { useState } from "react";
import { ColumnsPhotoAlbum, Photo } from "react-photo-album";
import Lightbox, { SlideImage, SlideVideo } from "yet-another-react-lightbox";

// Lightbox plugins
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import { FaRegCirclePlay } from "react-icons/fa6";

type MyPhoto = Photo & {
  usePlayWatermark?: boolean;
};

const convertToAlbumThumb = (slide: SlideVideo): MyPhoto => {
  const simage: MyPhoto = {
    usePlayWatermark: true,
    src: slide.poster,
    width: slide.width,
    height: slide.height,
    srcSet: [1080, 640, 384, 256, 128, 96, 64, 48].map((breakpoint) => {
      const height = Math.round((slide.height / slide.width) * breakpoint);
      return {
        src: slide.poster,
        width: breakpoint,
        height,
      };
    }),
  };
  return simage;
};

export default function PhotoGallery({ slides }) {
  const [index, setIndex] = useState(-1);

  const albumThumbs: MyPhoto[] = slides.map((sld) =>
    sld.type === "video" ? convertToAlbumThumb(sld) : sld
  );
  console.log(albumThumbs);
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
        plugins={[Zoom, Fullscreen, Video, Download]}
      />
    </>
  );
}
