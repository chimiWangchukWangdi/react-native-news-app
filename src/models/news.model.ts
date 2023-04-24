import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native";

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

export interface modalProps {
  visible: boolean;
  url: string;
  handleBack: () => void;
}

export interface inputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSubmit: (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  rssFeed?: string;
}

export interface Kuensel {
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Guid;
  content: Content;
  excerpt: Content;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: any[];
  acf: any[];
  _links: Links;
}

interface Links {
  self: Self[];
  collection: Self[];
  about: Self[];
  author: Author[];
  replies: Author[];
  'version-history': Versionhistory[];
  'wp:featuredmedia': Author[];
  'wp:attachment': Self[];
  'wp:term': Wpterm[];
  curies: Cury[];
}

interface Cury {
  name: string;
  href: string;
  templated: boolean;
}

interface Wpterm {
  taxonomy: string;
  embeddable: boolean;
  href: string;
}

interface Versionhistory {
  count: number;
  href: string;
}

interface Author {
  embeddable: boolean;
  href: string;
}

interface Self {
  href: string;
}

interface Content {
  rendered: string;
  protected: boolean;
}

interface Guid {
  rendered: string;
}