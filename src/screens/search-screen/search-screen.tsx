import React, { useState } from "react";
import { Center } from "native-base";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import SearchBar from "../../components/search-bar/search-bar";
import Article from "../../components/articles";
import { styles } from "./style";
import { NewsData } from "../../models/news.model";
import { searchArticles } from "../../services/news.api";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [articles, setArticles] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setArticles([])
    const articles = await searchArticles(searchText);
    setArticles(articles);
    setRefreshing(false);
  };

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
                refreshControl={
                  <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                }
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
