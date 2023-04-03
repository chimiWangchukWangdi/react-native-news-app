import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Center, ScrollView } from "native-base";
import { Chip, Button } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { NewsData } from "./utils/type";
import Article from "../components/articles";
import axios from "axios";

const Categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];
const API_KEY = "947cec9dbcf74747b963c311e02eecf0";

export default function CategoryScreen() {
  const [newsData, setNewsData] = useState<NewsData[] | never[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSelect = async (value: string) => {
    setLoading(true);
    if (selectedCategory === value) {
      setSelectedCategory("");
      setNewsData([]);
    } else {
      setSelectedCategory(value);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${value}&apiKey=${API_KEY}`
        );
        setNewsData(response.data.articles);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View>
      <Center>
        <Text style={styles.title}>Category</Text>
        <FontAwesomeIcon icon={faMugSaucer} size={32} color="#007AFF" />
      </Center>
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollView}
        >
          {Categories.map((category) => (
            <Chip
              key={category}
              mode="outlined"
              style={[
                styles.chipItem,
                selectedCategory === category && styles.selectedChipItem,
              ]}
              textStyle={{
                fontWeight: "400",
                color: "black",
                padding: 1,
              }}
              showSelectedOverlay
              selected={selectedCategory === category}
              onPress={() => handleSelect(category)}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
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
  filterScrollView: {
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  chipItem: {
    borderColor: "#A9A9A9",
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedChipItem: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  flatList: {
    height: "auto",
  },
});
