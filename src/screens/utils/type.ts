export type NewsData = {
  urlToImage: string | never;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  url: string;
};
