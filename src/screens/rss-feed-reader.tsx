import React, { useEffect, useState } from "react";
import Parser, { Feed, FeedItem } from "react-native-rss-parser";
import { Center, Text, View, FlatList, Heading, Box, Input } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalWebview from "../components/modal-webview/modal-webview";
import InputBar from "../components/search-bar/input-bar";

const RssFeedReader = () => {
  const [feed, setFeed] = useState<Feed>();
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const [webViewUrl, setWebViewUrl] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  const fetchRss = async (rssUrl: string) => {
    const response = await fetch(rssUrl);
    const xml = await response.text();
    const feed = await Parser.parse(xml);
    setFeed(feed);
  };

  const handleReadMore = (url: string) => {
    setShowWebView(true);
    setWebViewUrl(url);
  };

  const handleBack = () => {
    setShowWebView(false);
  };

  const handleInput = async () => {
    await fetchRss(inputText);
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
          Rss Feed {feed?.title && `: ${feed.title}`} 
        </Heading>
      </Center>
      <InputBar
        rssFeed={"rss url"}
        inputText={inputText}
        setInputText={setInputText}
        onSubmit={handleInput}
      />

      <FlatList
        p={3}
        data={feed?.items}
        renderItem={({ item }: { item: FeedItem }) => (
          <Box
            p={3}
            borderWidth={1}
            borderColor="primary.400"
            borderRadius={5}
            marginBottom={3}
          >
            <View>
              <TouchableOpacity
                onPress={() => handleReadMore(item.links[0].url)}
              >
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  numberOfLines={2}
                  mb={2}
                >
                  {item.title}
                </Text>
                <Text fontSize="sm" color="gray.500" numberOfLines={3} mb={2}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            </View>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
      {showWebView && (
        <ModalWebview
          visible={showWebView}
          url={webViewUrl}
          handleBack={handleBack}
        />
      )}
    </View>
  );
};

export default RssFeedReader;
