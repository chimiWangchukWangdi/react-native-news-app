import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Center } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { NewsData } from "./utils/type";
import Article from "../components/articles";
import axios from "axios";

const API_KEY = "947cec9dbcf74747b963c311e02eecf0";

export default function CategoryScreen() {
  const [newsData, setNewsData] = useState<NewsData[] | never[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNewsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        setNewsData(response.data.articles);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getNewsData();
  }, []);

  return (
    <View>
      <Center>
        <Text style={styles.title}>Top Headlines</Text>
        <FontAwesomeIcon icon={faMugSaucer} size={32} color="#007AFF" />
      </Center>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={styles.loading}
        />
      ) : (
        <FlatList
          style={styles.flatList}
          data={newsData}
          renderItem={({ item }) => (
            <Article
              title={item.title}
              author={item.author}
              description={item.description}
              publishedAt={item.publishedAt}
              urlToImage={item.urlToImage}
              source={item.source}
              url={item.url}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 16,
  },
  flatList: {
    height: "auto",
  },
  loading: {
    marginVertical: 16,
  },
});
