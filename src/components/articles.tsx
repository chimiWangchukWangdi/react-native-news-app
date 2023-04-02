import React from "react";
import {
  Box,
  Heading,
  HStack,
  Text,
  Image,
  VStack,
  Divider,
} from "native-base";

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
  return (
    <Box>
      <HStack justifyContent="space-between" space="20px" pb="10px">
        <VStack width="60%">
          <Heading size="sm">{props.title}</Heading>
          <Text fontSize="14px" color="black:alpha.60">
            By {props.author}
          </Text>
          <Text fontSize="14px" color="black:alpha.60">
            Source {props.source.name}
          </Text>
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
