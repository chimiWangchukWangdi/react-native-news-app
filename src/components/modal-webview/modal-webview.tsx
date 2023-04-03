import { Modal, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { modalProps } from "../../models/news.model";
import { styles } from "./style";

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
