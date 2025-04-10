export type ApiPost = {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  cover_url: string;
  author_email: string;
  gallery: ApiGalleryItem[];
};

export type ApiGalleryItem = {
  name: string;
  url: string;
  type: "image" | "video";
  mimetype: string;
  width: number;
  height: number;
  video_thumb_url: string;
};

export class AuthenticationError extends Error {}
