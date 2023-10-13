import GalleryItem from "../../interfaces/galleryItem";
import { mapGalleryToSlides } from "../../lib/utils";

const galleryItems: GalleryItem[] = [
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other1.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other2.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other3.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other4.jpg",
    height: 1080,
    width: 800,
  },
  {
    type: "video",
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other5.jpg",
    video: {
      path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other5.mp4",
      type: "video/mp4",
    },
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other7.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other8.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other9.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other10.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other11.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other13.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other14.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other15.jpg",
    height: 1080,
    width: 800,
  },
  {
    type: "video",
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other16.jpg",
    video: {
      path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other16.mp4",
      type: "video/mp4",
    },
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other17.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other18.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other19.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other20.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other21.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/pixel/other22.jpg",
    height: 1080,
    width: 800,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);

export default slides;
