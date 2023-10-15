import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";
const galleryItems: GalleryItem[] = [
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/sot1.jpeg",
    height: 567,
    width: 1008,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);
export default slides;
