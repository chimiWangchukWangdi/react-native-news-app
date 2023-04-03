import React, { useState } from "react";
import { Center, Text } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { View, FlatList, ActivityIndicator } from "react-native";
import SearchBar from "../../components/search-bar/search-bar";
import Article from "../../components/articles";
import { styles } from "./style";
import { NewsData } from "../../models/news.model";
import { searchArticles } from "../../services/news.api";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [articles, setArticles] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const articles = await searchArticles(searchText);
    setArticles(articles);
    setLoading(false);
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
        onSubmit={handleSearch}
      />
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View>
          {searchText !== "" && articles.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No matching data</Text>
            </View>
          ) : (
            <View>
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
            </View>
          )}
        </View>
      )}
    </View>
  );
}
