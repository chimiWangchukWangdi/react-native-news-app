import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Parser, { FeedItem } from "react-native-rss-parser";
import { Center, Text } from "native-base";

const RssFeedReader = () => {
  const [feedData, setFeedData] = useState<FeedItem[]>([]);

  const fetchRss = async () => {
    const response = await fetch("http://feeds.bbci.co.uk/news/rss.xml");
    const xml = await response.text();
    const feed = await Parser.parse(xml);
    setFeedData(feed.items);
  };

  useEffect(() => {
    fetchRss();
  }, []);

  return (
    <View>
      <Center>
        <Text fontSize="2xl">Headline</Text>
      </Center>
      <FlatList
        data={feedData}
        renderItem={({ item }: { item: FeedItem }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RssFeedReader;
