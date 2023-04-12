import axios from "axios";
import { NewsData } from "../models/news.model";
import Constants from "expo-constants";

const baseApiUrl = Constants.manifest?.extra?.BASE_API_URL;
const baseApiSearchUrl = Constants.manifest?.extra?.BASE_API_SEARCH_URL;
const baseApiPushUrl = Constants.manifest?.extra?.BASE_API_PUSH_URL
const apiKeyNewsApi = Constants.manifest?.extra?.API_KEY_NEWSAPI;
const apiKeyNewsData = Constants.manifest?.extra?.API_KEY_NEWSDATA;

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

// export const getNewsData = async (country: string, category?: string) => {
//   try {
//     let apiUrl = `${baseApiUrl}${apiKeyNewsApi}`;
//     if (category) {
//       apiUrl += `&category=${category}`;
//     }
//     const response = await axios.get(apiUrl);
//     return response.data.articles;
//   } catch (error) {
//     console.log("this is getNewsData", error);
//     return null;
//   }
// };

export const searchArticles = async (
  searchText: string
): Promise<NewsData[]> => {
  try {
    const response = await axios.get(
      `${baseApiSearchUrl}q=${searchText}&pageSize=10&apiKey=${apiKeyNewsApi}`
    );
    return response.data.articles;
  } catch (error) {
    console.log("this is searchArticles", error);
    return [];
  }
};

export async function getLatestNewsArticle() {
  const response = await fetch(
    `${baseApiPushUrl}${apiKeyNewsData}&q=disaster&country=in&language=en&category=business,environment,health,politics,world`
  );
  if (!response.ok) {
    const json = await response.json();
    return console.log("this is getLatestNewsAsrticle()", json.results.message);
  }
  const json = await response.json();
  console.log("this is the json data", json.results[0]);
  return json.results[0];
}
