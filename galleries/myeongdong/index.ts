import { LightboxData } from "../../components/lightbox-link";
import GalleryItem from "../../interfaces/galleryItem";
import { ClickGallery } from "../../interfaces/types";
import { mapGalleryToSlides } from "../../lib/utils";

const gallery: ClickGallery = {
  galleryItems: [
    {
      id: "pic1",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/milktea.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "pic2",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/scone.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "pic3",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/jjajjang.jpg",
        height: 800,
        width: 1080,
      },
    },
    {
      id: "pic4",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/jjam.jpg",
        height: 800,
        width: 1080,
      },
    },
    {
      id: "pic5",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/jjajjang2.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "noodles1",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/noodles1.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "bibim",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/bibim.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "dumpling1",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/dumpling1.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "dumpling2",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/dumpling2.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "kimchi",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/kimchi.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "noodles2",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/noodles2.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "noodles3",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/noodles3.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "myeongdonggyoza_outside",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/myeongdonggyoza_outside.jpg",
        height: 1080,
        width: 800,
      },
    },
    {
      id: "dabang",
      item: {
        path: "https://d1goytf13un2gh.cloudfront.net/assets/food/dabang.jpg",
        height: 1080,
        width: 800,
      },
    },
  ],
};

const indexById = {};
const slides = [];

gallery.galleryItems.forEach((e) => {
  slides.push(mapGalleryToSlides(e.item));
  indexById[e.id] = slides.length - 1;
});

export default {
  slideIndexById: indexById,
  slides,
} as LightboxData;
