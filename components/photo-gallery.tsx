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
  isLoaded?: boolean;
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
  const [flicker, setFlicker] = useState(false);
  // initialized to -2 to indicate first load.

  const albumThumbs: MyPhoto[] = slides
    .map((sld) => (sld.type === "video" ? convertToAlbumThumb(sld) : sld))
    .map((photo, index) => {
      if (index < 3 || photo.usePlayWatermark) {
        photo.isLoaded = true;
      }
      return photo;
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
        onClick={({ index, photo }) => {
          if (photo.isLoaded) setIndex(index);
          else {
            photo.isLoaded = true;
            setFlicker(!flicker); // forces this component to rerender and show loaded photo
          }
        }}
        render={{
          image: (props, { photo }) => {
            if (photo.isLoaded) {
              return <img {...props} />;
            }
            return (
              <div
                className="relative w-full text-center bg-amber-200 grid place-content-center items-center"
                style={{
                  aspectRatio: `${photo.width} / ${photo.height}`,
                }}
              >
                {photo.title}
              </div>
            );
          },
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
          slides={slides}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          carousel={{
            finite: true,
            padding: 0,
          }}
          animation={{
            fade: 0,
            swipe: 0,
            zoom: 0,
            navigation: 0,
          }}
          controller={{
            closeOnPullDown: true,
          }}
          zoom={{
            maxZoomPixelRatio: 0.5,
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
          on={{
            view: ({ index }) => {
              albumThumbs[index].isLoaded = true;
            },
          }}
        />
      )}
    </>
  );
}
