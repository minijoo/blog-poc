import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

// Lightbox plugins
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function PhotoGallery({ slides }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <PhotoAlbum
        photos={slides}
        layout="columns"
        columns={(containerWidth) => {
          if (containerWidth < 400) return 3;
          if (containerWidth < 800) return 4;
          return 5;
        }}
        rowConstraints={{
          singleRowMaxHeight: 100,
        }}
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
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
        plugins={[Zoom, Video]}
      />
    </>
  );
}
