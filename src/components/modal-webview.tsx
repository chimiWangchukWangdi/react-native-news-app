import {
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import WebView from "react-native-webview";

interface modalProps {
  visible: boolean;
  url: string;
  handleBack: () => void;
}

const ModelWebview = ({ visible, url, handleBack }: modalProps) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleBack()}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
        <WebView
          source={{ uri: url }}
          mediaPlaybackRequiresUserAction={true}
          style={styles.webView}
          injectedJavaScriptBeforeContentLoadedTimeout={10000}
        />
      </View>
    </Modal>
  );
};

export default ModelWebview;

const styles = StyleSheet.create({
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
