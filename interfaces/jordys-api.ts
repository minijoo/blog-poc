import { ObjectId } from "mongodb";

export type ApiPost = {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  cover_url: string;
  author: ObjectId;
  published: boolean;
  private: boolean;
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

export type Author = {
  username: string;
  email: string;
  _id: ObjectId;
  picture: string;
};

export class AuthenticationError extends Error {}
