import GalleryItem from "../../interfaces/galleryItem";
import { mapGalleryToSlides } from "../../lib/utils";

const galleryItems: GalleryItem[] = [
  {
    path: "/assets/blog/temp/pixel1.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "/assets/blog/temp/pixel2.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "/assets/blog/temp/pixel3.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "/assets/blog/temp/pixel4.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "/assets/blog/temp/pixel5.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "/assets/blog/temp/pixel6.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "/assets/blog/temp/pixel7.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "/assets/blog/temp/pixel8.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "/assets/blog/temp/pixel9.jpg",
    height: 1080,
    width: 800,
  },
  {
    type: "video",
    path: "/assets/blog/temp/pixel10_cover.png",
    video: {
      path: "/assets/blog/temp/pixel10.mp4",
      type: "video/mp4",
    },
    height: 1008,
    width: 567,
  },
  {
    path: "/assets/blog/temp/pixel11.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "/assets/blog/temp/pixel12.jpg",
    height: 800,
    width: 1080,
  },
  {
    path: "/assets/blog/temp/pixel13.jpg",
    height: 800,
    width: 1080,
  },
  {
    path: "/assets/blog/temp/pixel14.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "/assets/blog/temp/pixel15.jpg",
    height: 1080,
    width: 800,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);

export default slides;
