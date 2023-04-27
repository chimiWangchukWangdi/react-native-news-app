import { NativeSyntheticEvent, TextInputSubmitEditingEventData, View } from "react-native";
import React from "react";
import { Box, Input } from "native-base";
import { inputProps } from "../../models/news.model";
import { useSelector } from "react-redux";
import { getIsDarkMode } from "../../state/newsSlice/newsSlice";

const InputBar = (props: inputProps) => {
  const isDarkMode = useSelector(getIsDarkMode);
  
  return (
    <Box p={3} marginBottom={3}>
      <Input
        size="lg"
        borderWidth={1}
        borderColor={"primary.400"}
        color= {isDarkMode ? "gray.100" : "gray.700"}
        placeholder= {props.rssFeed ? "Enter the Rss Feed Url" : "Search"}
        value= {props.inputText}
        onChangeText={(text) => {
          props.setInputText(text);
        }}
        onSubmitEditing={props.onSubmit}
      />
    </Box>
  );
};

export default InputBar;
