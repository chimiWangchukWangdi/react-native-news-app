import { Modal, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import WebView from "react-native-webview";
import { modalProps } from "../../models/news.model";
import { styles } from "./style";

const ModelWebview = ({ visible, url, handleBack }: modalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleBack()}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : null}
        <WebView
          source={{ uri: url }}
          mediaPlaybackRequiresUserAction={true}
          style={styles.webView}
          injectedJavaScriptBeforeContentLoadedTimeout={10000}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
        />
      </View>
    </Modal>
  );
};

export default ModelWebview;
