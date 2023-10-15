import GalleryItem from "../../interfaces/galleryItem";
import { mapGalleryToSlides } from "../../lib/utils";

const galleryItems: GalleryItem[] = [
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/cone1.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/cone2.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/cone3.jpeg",
    height: 1080,
    width: 800,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);

export default slides;
