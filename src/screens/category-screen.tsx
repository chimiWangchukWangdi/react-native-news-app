import React, { useState } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import { Center } from "native-base";
import { Chip, Button } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { NewsData } from "./utils/type";
import CardItem from "../components/navigation/card-item";

const Categories = ["Technology", "Sports", "Politics", "Health", "Business"];
const API_KEY = "pub_19867a574651480e8031dc6e2452fbc96e295";

export default function CategoryScreen() {
  const [newsData, setNewsData] = useState<NewsData[] | never[]>([]);
  const [nextPage, setNextPage] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<
    string[] | never[]
  >([]);
  const handleSelect = (value: string) => {
    setSelectedCategories((previous: string[]) =>
      previous.find((p) => p === value)
        ? previous.filter((p) => p !== value)
        : [...previous, value]
    );
  };

  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en${
      selectedCategories.length > 0
        ? `&category=${selectedCategories.join()}`
        : ""
    }${nextPage?.length > 0 ? `&page=${nextPage}` : ""}`;
    try {
      await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setNewsData(data.results);
          // setNextPage(data.nextPage);
          console.log('handlePress - newsData1',newsData)
        });
    } catch (error) {
      console.log(error);
    }
    console.log('handlePress - newsData2',newsData)
  };

  return (
    <View>
      <Center>
        <Text>Category</Text>
        <FontAwesomeIcon icon={faMugSaucer} />
      </Center>
      <View style={styles.filtersContainer}>
        {Categories.map((category) => (
          <Chip
            key={category}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{ fontWeight: "400", color:"black", padding: 1}}
            showSelectedOverlay
            selected={
              selectedCategories?.find((c) => category === c) ? true : false
            }
            onPress={() => handleSelect(category)}
          >
            {category}
          </Chip>
        ))}
        <Button
          labelStyle={{ fontSize: 14, margin: "auto" }}
          icon={"sync"}
          onPress={handlePress}
        >
          Refresh
        </Button>
      </View>
      <FlatList
        /* TODO: to render a limited number of items initially and then load more items as the user scrolls.
        onEndReached={() => handlePress()}
        onEndReachedThreshold={0.5} */
        style={styles.flatList}
        data={newsData}
        renderItem={({ item }) => (
          <CardItem
            title={item.title}
            link={item.link}
            keywords={item.keywords}
            creator={item.creator}
            video_url={item.video_url}
            description={item.description}
            content={item.content}
            pubDate={item.pubDate}
            image_url={item.image_url}
            source_id={item.source_id}
            category={item.category}
            country={item.country}
            language={item.language}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  flatList: {
    height: "auto",
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5
  }
});
