import GalleryItem from "./galleryItem";

type GalleryEntry = {
  id: string;
  item: GalleryItem;
};

export type ClickGallery = {
  galleryItems: GalleryEntry[];
};
