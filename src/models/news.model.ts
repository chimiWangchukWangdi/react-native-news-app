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