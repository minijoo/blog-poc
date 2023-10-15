import GalleryItem from "../../interfaces/galleryItem";
import { mapGalleryToSlides } from "../../lib/utils";

const galleryItems: GalleryItem[] = [
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel1.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel2.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel3.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel4.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel5.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel6.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel7.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel8.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel9.jpg",
    height: 1080,
    width: 800,
  },
  {
    type: "video",
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel10_cover.png",
    video: {
      path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel10.mp4",
      type: "video/mp4",
    },
    height: 1008,
    width: 567,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel11.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel12.jpg",
    height: 800,
    width: 1080,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel13.jpg",
    height: 800,
    width: 1080,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel14.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/pixel15.jpg",
    height: 1080,
    width: 800,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);

export default slides;
