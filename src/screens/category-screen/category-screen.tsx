import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Center, Heading, ScrollView, View, FlatList } from "native-base";
import { Chip } from "react-native-paper";
import { NewsData, localNewsData } from "../../models/news.model";
import Article from "../../components/articles";
import { styles } from "./style";
import { Categories } from "../../utils/type";
import { useAppDispatch } from "../../state/store";
import { useSelector } from "react-redux";
import {
  clearAllNews,
  fetchAsyncNews,
  getAllNews,
  getLoadingState,
} from "../../state/newsSlice/newsSlice";

export default function CategoryScreen() {
  const dispatch = useAppDispatch();
  const data = useSelector(getAllNews);
  const isLoading = useSelector(getLoadingState);

  const [newsData, setNewsData] = useState<NewsData[] | never[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(clearAllNews());
    dispatch(fetchAsyncNews(selectedCategory));
    setRefreshing(false);
  };
  const refreshedControl = (
    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
  );

  const handleSelect = (value: string) => {
    try {
      setSelectedCategory((prevValue) => (prevValue === value ? "" : value));

      dispatch(fetchAsyncNews(value));
      setNewsData(data);
    } catch (error) {
      console.log("Error fetching news data:", error);
    }
  };

  useEffect(() => {
    handleSelect("business");
  }, []);

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
          Category
        </Heading>
      </Center>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          padding={2}
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
                color: "#003F5E",
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
      {isLoading ? (
        <ActivityIndicator size="large" color="#3182CE" />
      ) : (
        data && (
          <FlatList
            refreshControl={refreshedControl}
            data={data}
            renderItem={({ item }: { item: NewsData }) => (
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
        )
      )}
    </View>
  );
}
