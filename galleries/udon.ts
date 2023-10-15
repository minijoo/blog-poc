import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";
const galleryItems: GalleryItem[] = [
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/udon1.jpeg",
    height: 800,
    width: 1080,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/udon2.jpeg",
    height: 800,
    width: 1080,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/udon3.jpeg",
    height: 1080,
    width: 800,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);
export default slides;
