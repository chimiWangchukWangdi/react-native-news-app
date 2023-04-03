import { StyleSheet, Platform, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 50 : 0,
  },
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 20,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  webView: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
});
