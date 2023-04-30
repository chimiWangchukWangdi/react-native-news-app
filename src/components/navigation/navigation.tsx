import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./bottom-tabs";
import CustomDrawer from "./custom-drawer";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoggedInState,
} from "../../state/auth-state/authSlice";
import Login from "../login";
import { Text, View, Icon } from "native-base";
import { darkMode } from "../../state/newsSlice/newsSlice";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function Navigation() {
  const isLoggedIn = useSelector(getLoggedInState);
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    dispatch(darkMode());
    setIsDarkMode(!isDarkMode);
  };

  // Custom header title component
  const CustomHeaderTitle = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16
        }}
      >
        <View paddingLeft={16}>
          <Text fontSize="18" color="primary.500" fontWeight="bold" marginRight="10">
            News App
          </Text>
        </View>
        <View paddingLeft={16}>
        <Icon
          as={<Ionicons name={isDarkMode ? "sunny-outline" : "moon-outline"} />}
          size="lg"
          color="primary.500"
          onPress={handleToggle}
        />
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
