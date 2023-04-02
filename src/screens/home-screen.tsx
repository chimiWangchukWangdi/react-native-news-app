import React from "react"
import {
    AspectRatio,
    Box,
    Heading,
    HStack,
    ScrollView,
    Text,
    Image,
    VStack,
    Link,
    Divider,
    Center
} from "native-base";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { View } from "react-native";

const cardCount = 6;

export default function HomeScreen() {
  return (
    <View>
      <Center>
      <Text>Hello Screen</Text>
      <FontAwesomeIcon icon={faMugSaucer} />
    </Center>
       <ScrollView p="12px">
            <Box mb="18px" position="relative">
                <AspectRatio ratio={16 / 9} bg="black.100">
                    <Image source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrymQLCPaZ7fUzY1pm7ipOfAxmwYhKnue_Ow&usqp=CAU"
                    }} alt="hot news image"/>
                </AspectRatio>
                <VStack position="absolute" left="6" bottom="30">
                    <Text color="white" bg="white:alpha.40" borderRadius="20px" py="4px" px="16px" width="150px">News of
                        the day</Text>
                    <Heading color="white" pt="8px" size="lg">Russians Close In on Ukrainian Capital</Heading>
                    <Link flex="1" alignItems="center"
                          href="https://www.aljazeera.com/news/liveblog/2023/1/18/russia-ukraine-live-news-casualties-helicopter-crashes-near-nursery"
                          isExternal>
                        <Text mt="2px" pr="6px" fontSize={12} fontWeight="medium" color="tomato">
                            Read More
                        </Text>
                        <FontAwesomeIcon icon={faArrowRight} color="tomato"/>
                    </Link>
                </VStack>
            </Box>
            <Heading size="md" pb="12px" color="yellow">Breaking News</Heading>
            {[...Array(cardCount)].map((index) => (
                <Box key={index}>
                    <HStack justifyContent="space-between" space="20px" pb="10px">
                        <VStack width="60%">
                            <Heading size="sm">
                                Studies Examine the studies of Bhutan
                            </Heading>
                            <Text fontSize="12px" fontWeight="500" color="gray:alpha.50">
                                4 Hours Ago
                            </Text>
                            <Text fontSize="14px" color="black:alpha.60">
                                By Chimi wangdi
                            </Text>
                        </VStack>

                        <Image width="100px"
                               borderRadius="10px"
                               height="90px" resizeMode="cover"
                               source={{uri: "https://www.undp.org/sites/g/files/zskgke326/files/2022-05/undp-bhutan-covid-vaccine.jpeg"}}
                               alt="image"/>

                    </HStack>
                    <Divider mb="16px"/>
                </Box>
            ))}

        </ScrollView>
    </View>
  );
}
