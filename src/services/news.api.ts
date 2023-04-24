import axios from "axios";
import { NewsData } from "../models/news.model";
import Constants from "expo-constants";

const baseApiUrl = Constants.manifest?.extra?.BASE_API_URL;
const baseApiPushUrl = Constants.manifest?.extra?.BASE_API_PUSH_URL;
const apiKeyNewsApi = Constants.manifest?.extra?.API_KEY_NEWSAPI;
const apiKeyNewsData = Constants.manifest?.extra?.API_KEY_NEWSDATA;

export const getNewsData = async (category?: string) => {
  if(category === "local") {
    try {
      let apiUrl = "https://kuenselonline.com/wp-json/wp/v2/posts";
      const response = await axios.get(apiUrl);
      console.log('kuensel', response)
      return response.data;
    } catch (error) {
      console.log("this is fetchAsyncNews-local", error);
      return null;
    }
  }
  else{
    try {
      const country = "us";
      let apiUrl = `${baseApiUrl}top-headlines?country=us&apiKey=${apiKeyNewsApi}`;
      if (category) {
        apiUrl += `&category=${category}`;
      }
      const response = await axios.get(apiUrl);
      return response.data.articles;
    } catch (error) {
      console.log("this is fetchAsyncNews", error);
      return null;
    }
  }
};

export const searchArticles = async (
  searchText: string
): Promise<NewsData[]> => {
  try {
    const response = await axios.get(
      `${baseApiUrl}everything?q=${searchText}&pageSize=10&apiKey=${apiKeyNewsApi}`
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



