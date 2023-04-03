import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Center } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { NewsData } from "../../models/news.model";
import Article from "../../components/articles";
import { getNewsData } from "../../services/news.api";
import { styles } from "./style";

export default function CategoryScreen() {
  const [newsData, setNewsData] = useState<NewsData[] | never[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getNewsData("us");
        setNewsData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
