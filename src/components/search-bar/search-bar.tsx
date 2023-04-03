import { View } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./style";

interface searchProps {
  searchText: string;
  setSearchText: (text: string) => void;
  onSubmit: ([]: any) => void;
}

const SearchBar = (props: searchProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        value={props.searchText}
        onChangeText={(text) => {
          props.setSearchText(text);
        }}
        onSubmitEditing={props.onSubmit}
      />
    </View>
  );
};

export default SearchBar;
