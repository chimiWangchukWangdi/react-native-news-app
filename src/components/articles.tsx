import React, { useState } from "react";
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
import ModalWebview from "./modal-webview/modal-webview";
import { NewsData } from "../models/news.model";

const Article = (props: NewsData) => {
  const [showWebView, setShowWebView] = useState(false);

  const handleReadMore = () => {
    setShowWebView(true);
  };

  const handleBack = () => {
    setShowWebView(false);
  };

  return (
    <Box marginX="12px">
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
            onPress={() => handleReadMore()}
          >
            <Text style={{ color: "#1877f2", fontWeight: "bold" }}>
              Read More...
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
