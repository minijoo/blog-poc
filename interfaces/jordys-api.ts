import { ObjectId } from "mongodb";

export interface Rating {
  _id?: string
  name: string
  link: string
  category: string
  location: string
  tags: string[]
  notes: string
  rating: number;
  editDate?: string; // date string
  imgUrl?: string
  imgWidth?: number;
  imgHeight?: number;
}

export type ApiPost = {
  _id: string;
  dashname: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  cover_url: string;
  author: ObjectId;
  published: boolean;
  private: boolean;
  is_tech_post: boolean;
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

export class AuthenticationError extends Error { }
