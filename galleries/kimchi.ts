import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";
const galleryItems: GalleryItem[] = [
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/kimchi1.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/kimchi2.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/kimchi3.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/kimchi4.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/kimchi5.jpeg",
    height: 1008,
    width: 567,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);
export default slides;
