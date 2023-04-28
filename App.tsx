import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { customTheme } from "./src/styles/theme";
import Navigation from "./src/components/navigation/navigation";
import { Provider } from "react-redux";
import { persistor, store } from "./src/state/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  useFonts({
    MontRegular: require("./assets/fonts/MontRegular.ttf"),
  });
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider theme={customTheme}>
            <StatusBar translucent backgroundColor="transparent" />
            <Navigation />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
