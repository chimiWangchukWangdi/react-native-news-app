import React, { useState } from "react";
import { Center, Text, ScrollView } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { View, StyleSheet, FlatList } from "react-native";
import SearchBar from "../components/search-bar";
import axios from "axios";
import Article, { articleProps } from "../components/articles";

interface articleProp {
  urlToImage: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  url: string;
}

const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=947cec9dbcf74747b963c311e02eecf0`;
const API_KEY = "pub_947cec9dbcf74747b963c311e02eecf0";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [articles, setArticles] = useState<articleProp[]>([]);

  const searchArticles = () => {
    axios
      .get(URL, {
        params: {
          category: "",
          q: searchText,
        },
      })
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed;
      });
    //console.log('this is articles', Object.keys(articles[0]))
  };

  return (
    <View>
      <Center>
        <Text style={styles.title}>Search Screen</Text>
        <FontAwesomeIcon icon={faMugSaucer} size={32} color="#007AFF" />
      </Center>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSubmit={searchArticles}
      />
      <ScrollView p="12px">
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Article
              urlToImage={item.urlToImage}
              title={item.title}
              description={item.description}
              author={item.author}
              publishedAt={item.publishedAt}
              source={item.source}
              url={item.url}
            />
          )}
        />
      </ScrollView>
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
  container: {
    flex: 1,
    background: "#fff",
  },
});
