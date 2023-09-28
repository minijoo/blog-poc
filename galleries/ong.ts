import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";
const galleryItems: GalleryItem[] = [
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/ong1.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/ong2.jpeg",
    height: 567,
    width: 1008,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/ong3.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/ong4.jpeg",
    height: 1008,
    width: 567,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);
export default slides;
