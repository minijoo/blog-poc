import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";

const galleryItems: GalleryItem[] = [
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8910-cropped.jpg",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8920-cropped.jpg",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8908.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8909.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8910.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8911.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8912.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8913.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8914.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8915.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8916.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8917.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8918.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8919.JPG",
    height: 4160,
    width: 6240,
  },
  {
    path: "https://public--asia.s3.ap-northeast-2.amazonaws.com/hh-photos/IMG_8920.JPG",
    height: 4160,
    width: 6240,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);

export default slides;
