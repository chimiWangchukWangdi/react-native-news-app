import axios from "axios";
import Config from "react-native-config";
import { NewsData } from "../models/news.model";

/* export const getNewsData = async () => {
  try {
    const response = await axios.get(
      Config.BASE_API_URL ??
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=947cec9dbcf74747b963c311e02eecf0"
    );
    return response.data.articles;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCategoryNewsData = async (
  country: string,
  category: string
) => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=947cec9dbcf74747b963c311e02eecf0`
  );
  try {
    return response.data.articles;
  } catch (error) {
    console.log(error);
  }
}; */

export const getNewsData = async (country: string, category?: string) => {
  try {
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=947cec9dbcf74747b963c311e02eecf0`;
    if (category) {
      apiUrl += `&category=${category}`;
    }
    const response = await axios.get(apiUrl);
    return response.data.articles;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const searchArticles = async (
  searchText: string
): Promise<NewsData[]> => {
  try {
    const response = await axios.get(
      Config.BASE_API_URL ??
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=947cec9dbcf74747b963c311e02eecf0",
      {
        params: {
          category: "",
          q: searchText,
        },
      }
    );
    return response.data.articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};
