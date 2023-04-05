import React, { useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { Center, ScrollView } from "native-base";
import { Chip } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { NewsData } from "../../models/news.model";
import Article from "../../components/articles";
import { styles } from "./style";
import { getNewsData } from "../../services/news.api";
import { Categories } from "../../utils/type";

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
        const data = await getNewsData("us", value);
        setNewsData(data);
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
