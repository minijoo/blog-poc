import GalleryItem from "../interfaces/galleryItem";
import { mapGalleryToSlides } from "../lib/utils";
const galleryItems: GalleryItem[] = [
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi1.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi2.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi3.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi4.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi5.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi6.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi7.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi8.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi9.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi10.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi11.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi12.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi13.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi14.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi15.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi16.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi17.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi18.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi19.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/food/tachi20.jpeg",
    height: 1080,
    width: 800,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);
export default slides;
