import React, { useState } from "react";
import { Modal, View, Dimensions, StyleSheet, Platform } from "react-native";
import {
  Box,
  Heading,
  HStack,
  Text,
  Image,
  VStack,
  Divider,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import WebView from "react-native-webview";
import ModalWebview from "./modal-webview";

export interface articleProps {
  urlToImage: string | never;
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

const Article = (props: articleProps) => {
  const [showWebView, setShowWebView] = useState(false);

  const handleReadMore = () => {
    setShowWebView(true);
    console.log("url", props.url);
  };

  const handleBack = () => {
    setShowWebView(false);
  };

  return (
    <Box>
      <HStack justifyContent="space-between" space="20px" pb="10px">
        <VStack width="60%">
          <Heading size="sm" numberOfLines={2}>
            {props.title}
          </Heading>
          <Text fontSize="14px" color="black:alpha.60">
            By {props.author}
          </Text>
          <Text fontSize="14px" color="black:alpha.60">
            Source {props.source.name}
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#1877f2",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => handleReadMore()}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Read More
            </Text>
          </TouchableOpacity>
          <ModalWebview
            visible={showWebView}
            url={props.url}
            handleBack={handleBack}
          />
        </VStack>

        <Image
          width="100px"
          borderRadius="10px"
          height="90px"
          resizeMode="cover"
          source={{
            uri: props.urlToImage,
          }}
          alt="image"
        />
      </HStack>
      <Divider mb="16px" />
    </Box>
  );
};

export default Article;
