import GalleryItem from "../../interfaces/galleryItem";
import { mapGalleryToSlides } from "../../lib/utils";

const galleryItems: GalleryItem[] = [
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other1.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other2.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other3.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other4.jpg",
    height: 1080,
    width: 800,
  },
  {
    type: "video",
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other5.jpg",
    video: {
      path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other5.mp4",
      type: "video/mp4",
    },
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other7.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other8.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other9.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other10.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other11.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other13.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other14.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other15.jpg",
    height: 1080,
    width: 800,
  },
  {
    type: "video",
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other16.jpg",
    video: {
      path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other16.mp4",
      type: "video/mp4",
    },
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other17.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other18.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other19.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other20.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other21.jpg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://d1goytf13un2gh.cloudfront.net/assets/pixel/other22.jpg",
    height: 1080,
    width: 800,
  },
];

const slides = galleryItems.map(mapGalleryToSlides);

export default slides;
