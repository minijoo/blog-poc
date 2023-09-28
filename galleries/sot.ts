import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";
const galleryItems: GalleryItem[] = [
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/sot1.jpeg",
    height: 567,
    width: 1008,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);
export default slides;
