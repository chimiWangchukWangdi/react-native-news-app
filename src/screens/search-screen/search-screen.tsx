import React, { useState } from "react";
import { Center, View, FlatList, Text, Heading, Image } from "native-base";
import { ActivityIndicator, RefreshControl } from "react-native";
import InputBar from "../../components/search-bar/input-bar";
import Article from "../../components/articles";
// import { styles } from "./style";
import { NewsData } from "../../models/news.model";
import { searchArticles } from "../../services/news.api";

export default function SearchScreen() {
  // const imgNoData = require('../../../assets/no-data.png');

  const [inputText, setInputText] = useState("");
  const [articles, setArticles] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setArticles([]);
    const articles = await searchArticles(inputText);
    setArticles(articles);
    setRefreshing(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    const articles = await searchArticles(inputText);
    setArticles(articles);
    setLoading(false);
  };

  return (
    <View>
      <Center>
        <Heading
          fontSize="24px"
          fontWeight="bold"
          color="primary.500"
          marginBottom="10px"
          marginTop="10px"
        >
          Search Screen
        </Heading>
      </Center>
      <InputBar
        inputText={inputText}
        setInputText={setInputText}
        onSubmit={handleSearch}
      />
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#3182CE" />
        </View>
      ) : (
        <View>
          {articles.length === 0 ? (
            <View justifyContent="center" alignItems="center">
              <Image size={300} borderRadius={10} source={require('../../../assets/no-data.png')} alt="no matching data" />
            </View>
          ) : (
            <View>
              <FlatList
                refreshControl={
                  <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
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
