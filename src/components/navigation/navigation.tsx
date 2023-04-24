import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./bottom-tabs";
import CustomDrawer from "./custom-drawer";
import RssFeedReader from "../../screens/rss-feed-reader";
import { useSelector } from "react-redux";
import { getLoggedInState } from "../../state/auth-state/authSlice";
import Login from "../login";

const Drawer = createDrawerNavigator();

function Navigation() {
  const isLoggedIn = useSelector(getLoggedInState); 

  return (
    <NavigationContainer>
      {isLoggedIn ?
      (<Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen name="News App" component={BottomTabs} />
        <Drawer.Screen name="Rss Feed" component={RssFeedReader} />
      </Drawer.Navigator>) :
      <Login />}
    </NavigationContainer>
  );
}

export default Navigation;
