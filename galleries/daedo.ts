import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";
const galleryItems: GalleryItem[] = [
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo1.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo2.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo3.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo4.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo5.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo6.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo7.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo8.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo9.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo10.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo11.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/daedo12.jpeg",
    width: 1080,
    height: 800,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);
export default slides;
