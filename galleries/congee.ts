import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";

const galleryItems: GalleryItem[] = [
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/congee2.jpeg",
    height: 800,
    width: 1080,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);

export default slides;
