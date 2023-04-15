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
import { Ionicons } from "@expo/vector-icons";
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
    <Box p={3}>
      <HStack justifyContent="space-between">
        <VStack width="65%">
          <Heading fontSize="md" fontWeight="medium" numberOfLines={2} mb={2}>
            {props.title}
          </Heading>
          <HStack mb={1}>
            <Ionicons name="person-outline" size={16} color="#4299E1" mr={2} />
            <Text fontSize="xs" color="gray.700">
              {props.author}
            </Text>
          </HStack>
          <HStack mb={2}>
            <Ionicons
              name="newspaper-outline"
              size={16}
              color="#4299E1"
              mr={2}
            />
            <Text fontSize="xs" color="gray.700">
              {props.source.name}
            </Text>
          </HStack>
          <TouchableOpacity
            onPress={() => handleReadMore()}
            activeOpacity={0.8}
          >
            <HStack>
              <Ionicons
                name="arrow-forward-outline"
                size={20}
                color="#3182CE"
                mr={1}
              />
              <Text fontSize="sm" fontWeight="medium" color="#3182CE">
                Read More
              </Text>
            </HStack>
          </TouchableOpacity>
        </VStack>
        <Image
          width="30%"
          borderRadius={10}
          height={120}
          resizeMode="cover"
          source={{ uri: props.urlToImage }}
          alt="article image"
        />
      </HStack>
      <Divider mt={4} />
      <ModalWebview
        visible={showWebView}
        url={props.url}
        handleBack={handleBack}
      />
    </Box>
  );
};

export default Article;
