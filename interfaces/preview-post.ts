export type PreviewPost = {
  metadata: {
    title: string;
    date: string;
    coverImage: string;
    excerpt: string;
    author_name: string;
    author_picture: string;
    private?: boolean;
  };
  slug: string;
};
