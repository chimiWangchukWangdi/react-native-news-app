import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 16,
  },
  filterScrollView: {
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  chipItem: {
    borderColor: "#A9A9A9",
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedChipItem: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  flatList: {
    height: "auto",
  },
});
