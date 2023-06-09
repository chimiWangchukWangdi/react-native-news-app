import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Text,
  Image,
  VStack,
  Divider,
  IconButton,
  ShareIcon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalWebview from "./modal-webview/modal-webview";
import { NewsData } from "../models/news.model";
import StarRating from "react-native-star-rating-widget";
import firestore from '@react-native-firebase/firestore';
import { Share } from "react-native";
import { useSelector } from "react-redux";
import { getIsDarkMode } from "../state/newsSlice/newsSlice";

const Article = (props: NewsData) => {
  const [showWebView, setShowWebView] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const isDarkMode = useSelector(getIsDarkMode);

  /* useEffect(() => {
    const fetchRating = async () => {
      const querySnapshot = firestore()
          .collection('articles')
          if(!!querySnapshot){
      try {
        const querySnapshot = await firestore()
          .collection('articles')
          .where('articleTitle', '==', props.title)
          .get();
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          setRating(docSnapshot.data().rating);
        } else {
          setRating(0);
        }
      } catch (error) {
        console.error(error);
      }
    }};
    
    fetchRating();
  }, []); */

  const handleReadMore = () => {
    setShowWebView(true);
  };

  const handleBack = () => {
    setShowWebView(false);
  };

  const handleSubmitRating = async (startValue: number) => {
    setRating(startValue);
    const articleTitle = props.title;
  
    try {
      const querySnapshot = await firestore()
        .collection('articles')
        .where('articleTitle', '==', articleTitle)
        .get();
  
      if (!querySnapshot.empty) {
        // Update existing rating document
        const ratingRef = querySnapshot.docs[0].ref;
        await ratingRef.update({ rating: startValue });
        console.log('Rating updated for article', articleTitle);
      } else {
        // Create new rating document
        const ratingRef = await firestore()
          .collection('articles')
          .add({ articleTitle, rating: startValue });
        console.log('New rating added for article', articleTitle);
      }
    } catch (error) {
      console.log('Error adding/updating rating:', error);
    }
  };
  

  const shareNews = async() => {
    try {
      const url = props.url;
      const title = props.title;
      const author = props.author;
      const source = props.source?.name || 'Unknown source';
  
      // Construct the message to be shared
      let message = `${title}\n\n`;
  
      if (author) {
        message += `Author: ${author}\n`;
      }
  
      message += `Source: ${source}\n\nRead More: ${url}`;
  
      // Construct the deep link for Google search
      const query = `${title} ${author} ${source}`.replace(/ /g, '+');
      const deepLink = `https://www.google.com/search?q=${query}&tbas=0&tbs=sbd:1`;
  
      // Share the message and deep link using the Share API
      await Share.share({
        message,
        url: deepLink,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={3}>
      <HStack justifyContent="space-between">
        <VStack width="65%">
          <Heading
            fontSize="md"
            fontWeight="medium"
            numberOfLines={2}
            mb={2}
            color={isDarkMode ? "gray.100" : "gray.700"}
          >
            {props.title}
          </Heading>
          <HStack mb={1}>
            <Ionicons name="person-outline" size={16} color="#4299E1" mr={2} />
            <Text fontSize="xs" color={isDarkMode ? "gray.100" : "gray.700"}>
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
            {props.source && (
              <Text fontSize="xs" color={isDarkMode ? "gray.100" : "gray.700"}>
                {props.source.name}
              </Text>
            )}
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

          <HStack justifyContent="space-between" alignItems="center">
            {/* <StarRating
              starSize={20}
              color="#3182CE"
              rating={rating}
              onChange={handleSubmitRating}
            /> */}
            <IconButton
              variant="unstyled"
              icon={<ShareIcon size="sm" color="#4299E1" />}
              onPress={shareNews}
            />
          </HStack>
        </VStack>
        {props.urlToImage ? (
          <Image
            width="30%"
            borderRadius={10}
            height={120}
            resizeMode="cover"
            source={{ uri: props.urlToImage }}
            alt="article image"
          />
        ) : (
          <Text textAlign="center">
            No Image
          </Text>
        )}
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
