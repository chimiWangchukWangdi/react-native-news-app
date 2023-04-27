import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./bottom-tabs";
import CustomDrawer from "./custom-drawer";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoggedInState,
  setIsLoggedOut,
} from "../../state/auth-state/authSlice";
import Login from "../login";
import { Text, Button, View } from "native-base";
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View paddingLeft={16}>
          <Text fontSize="18" fontWeight="bold" marginRight="10">
            News App
          </Text>
        </View>
        <View paddingLeft={6}>
          <Button borderRadius={7} size="sm" onPress={handleToggle}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </View>
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
