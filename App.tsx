import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { customTheme } from "./src/styles/theme";
import Navigation from "./src/components/navigation/navigation";
import { Provider } from "react-redux";
import { store } from "./src/state/store";

export default function App() {
  useFonts({
    MontRegular: require("./assets/fonts/MontRegular.ttf"),
  });
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NativeBaseProvider theme={customTheme}>
          <StatusBar translucent backgroundColor="transparent" />
          <Navigation />
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
