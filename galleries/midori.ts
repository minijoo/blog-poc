import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";
const galleryItems: GalleryItem[] = [
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/midori1.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/midori2.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/midori3.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/midori4.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/midori5.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/midori6.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/midori7.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/midori8.jpeg",
    height: 1008,
    width: 567,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);
export default slides;
