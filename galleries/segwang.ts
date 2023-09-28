import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";
const galleryItems: GalleryItem[] = [
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang1.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang2.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang3.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang4.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang5.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang6.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang7.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang8.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang9.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang10.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang11.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang12.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang13.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang14.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/segwang15.jpeg",
    height: 800,
    width: 1080,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);
export default slides;
