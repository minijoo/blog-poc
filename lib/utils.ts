import GalleryItem from "../interfaces/galleryItem";

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const mapGalleryToSlides = (galleryItem: GalleryItem) => {
  if (galleryItem.type === "video") {
    return {
      type: "video",
      sources: [
        {
          src: galleryItem.video.path,
          type: galleryItem.video.type,
        },
      ],
      poster: galleryItem.path,
      src: galleryItem.path,
      width: galleryItem.width,
      height: galleryItem.height,
      autoPlay: true,
    };
  } else {
    return {
      src: galleryItem.path,
      width: galleryItem.width,
      height: galleryItem.height,
      srcSet: breakpoints.map((breakpoint) => {
        const height = Math.round(
          (galleryItem.height / galleryItem.width) * breakpoint
        );
        return {
          src: galleryItem.path,
          width: breakpoint,
          height,
        };
      }),
    };
  }
};

export { mapGalleryToSlides };
