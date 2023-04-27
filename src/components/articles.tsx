import React, { useEffect, useState } from "react";
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
import StarRating from "react-native-star-rating-widget";
import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const Article = (props: NewsData) => {
  const [showWebView, setShowWebView] = useState(false);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchRating = async() => {
      const querySnapShot = await getDocs(
        query(
          collection(db, "articles"),
          where("articleTitle", "==", props.title)
        )
      );
      console.log('fetchRating inn', querySnapShot)
      if (!querySnapShot.empty) {
        const docSnapshot = querySnapShot.docs[0];
        setRating(docSnapshot.data().rating);
      } else {
        setRating(0);
      }
    }
    fetchRating();
  }, []);

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
      const querySnapShot = await getDocs(
        query(
          collection(db, "articles"),
          where("articleTitle", "==", articleTitle)
        )
      );

      if (querySnapShot.docs.length > 0) {
        // Update existing rating document
        const ratingRef = doc(db, "articles", querySnapShot.docs[0].id);
        await updateDoc(ratingRef, { rating: startValue });
        console.log("Rating updated for article ", articleTitle);
      } else {
        // Create new rating document
        const ratingRef = await addDoc(collection(db, "articles"), {
          articleTitle: articleTitle,
          rating: startValue,
        });
        console.log("New rating added for article ", articleTitle);
      }
    } catch (error) {
      console.log("Error adding/updating rating: ", error);
    }
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
            {props.source && (
              <Text fontSize="xs" color="gray.700">
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
          <StarRating
            starSize={20}
            color="#3182CE"
            rating={rating}
            onChange={handleSubmitRating}
          />
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
