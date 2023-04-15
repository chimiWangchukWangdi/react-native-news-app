import { NativeSyntheticEvent, TextInputSubmitEditingEventData, View } from "react-native";
import React from "react";
import { Box, Input } from "native-base";
import { inputProps } from "../../models/news.model";

const InputBar = (props: inputProps) => {
  return (
    <Box p={3} marginBottom={3}>
      <Input
        size="lg"
        borderWidth={1}
        borderColor={"primary.400"}
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
