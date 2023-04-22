import {
  Box,
  HStack,
  Heading,
  VStack,
  Text,
  Divider,
  Image,
  Center,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import ModalWebview from "./modal-webview/modal-webview";

export interface localNewsData {
  //   acf: Array<number>,
  author: number;
  //   categories: Array<number>,
  //   comment_status: string,
  //   content: {
  //     protected: boolean
  //     rendered: string
  //   },
  //   date: string,
  //   date_gmt: string,
  //   excerpt: {
  //     protected: boolean
  //     rendered: string
  //   },
  //   featured_media: number,
  //   format: string,
  //   guid: {
  //     rendered: string
  //   },
  //   id: number,
  link: string;
  //   meta: Array<number>,
  //   modified: string,
  //   modified_gmt: string,
  //   ping_status: string,
  //   slug: string,
  //   status: string,
  //   sticky: false,
  //   tags: Array<number>,
  //   template: string,
  title: {
    rendered: string;
  };
  //   type: string
}

function LocalArticles(props: localNewsData) {
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
            {props.title.rendered}
          </Heading>
          <HStack mb={1}>
            <Ionicons name="person-outline" size={16} color="#4299E1" mr={2} />
            <Text fontSize="xs" color="gray.700">
              Kuensel
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
              Kuensel
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
          height={70}
          flex={1}
          width="30%"
          borderRadius={10}
          //height={120}
          resizeMode="center"
          source={{
            uri: "https://kuenselonline.com/wp-content/uploads/2021/05/logo-1-1.png",
          }}
          alt="article image"
        />
      </HStack>
      <Divider mt={4} />
      <ModalWebview
        visible={showWebView}
        url={props.link}
        handleBack={handleBack}
      />
    </Box>
  );
}

export default LocalArticles;
