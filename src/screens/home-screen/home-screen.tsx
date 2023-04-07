import React, { useEffect } from "react";
import {
  FlatList,
  Text,
  View,
} from "react-native";
import { Center } from "native-base";
import Article from "../../components/articles";
import { styles } from "./style";
import { useAppDispatch } from "../../state/store";
import { fetchAsyncNews, getAllNews } from "../../state/newsSlice/newsSlice";
import { useSelector } from "react-redux";
import { NewsData } from "../../models/news.model";

export default function CategoryScreen() {

  const dispatch = useAppDispatch();
  const data = useSelector(getAllNews);

  useEffect(() => {
    dispatch(fetchAsyncNews(""));
  }, []);

  return (
    <View>
      <Center>
        <Text style={styles.title}>Top Headlines</Text>
      </Center>
        <FlatList
          style={styles.flatList}
          data={data}
          renderItem={({ item }: {item: NewsData}) => (
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
    </View>
  );
}
