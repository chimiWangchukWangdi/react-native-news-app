import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./bottom-tabs";
import CustomDrawer from "./custom-drawer";
import RssFeedReader from "../../screens/rss-feed-reader";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoggedInState,
  setIsLoggedOut,
} from "../../state/auth-state/authSlice";
import Login from "../login";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, Button } from "native-base";
import { darkMode } from "../../state/newsSlice/newsSlice";

const Drawer = createDrawerNavigator();

function Navigation() {
  const isLoggedIn = useSelector(getLoggedInState);
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    dispatch(darkMode());
    setIsDarkMode(!isDarkMode);
  };

  // Logout handler
  const handleLogout = () => {
    // Dispatch the logout action from authSlice
    dispatch(setIsLoggedOut());
  };

  // Custom header title component
  const CustomHeaderTitle = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text fontSize="18" fontWeight="bold" marginRight="10">
          News App
        </Text>
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="log-out-outline" size={24} color="black" />
          <Text fontSize="16" marginLeft="5">
            Logout
          </Text>
        </TouchableOpacity>
        <Button onPress={handleToggle}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </View>
    );
  };

  return (
      <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
        >
          <Drawer.Screen
            name="News App"
            component={BottomTabs}
            options={{
              headerTitle: () => <CustomHeaderTitle />,
            }}
          />
        </Drawer.Navigator>
      ) : (
        <Login />
      )}
    </NavigationContainer>    
  );
}

export default Navigation;
