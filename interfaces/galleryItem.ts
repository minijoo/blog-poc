type GalleryItem = {
  type?: "image" | "video";
  path: string; // If "video", specity path to thumbnail in lightbox view here
  height: number;
  width: number;
  video?: {
    path: string; // Path to mp4 file
    type: "video/mp4"; // Only known supported file is "video/mp4"
  };
};

export default GalleryItem;
