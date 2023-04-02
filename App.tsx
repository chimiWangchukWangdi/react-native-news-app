import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { customTheme } from "./src/styles/theme";
import Navigation from "./src/components/navigation/navigation";

export default function App() {
  useFonts({
    MontRegular: require("./assets/fonts/MontRegular.ttf"),
  });
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={customTheme}>
        <StatusBar translucent backgroundColor="transparent" />
        <Navigation />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
