import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/home-screen";
import CategoryScreen from "../../screens/category-screen";
import SearchScreen from "../../screens/search-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faPerson,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const [open, setOpen] = React.useState(false);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = faHome;
          } else if (route.name === "Category") {
            iconName = faSearch;
          } else if (route.name === "Search") {
            iconName = faPerson;
          }

          return <FontAwesomeIcon icon={iconName} size={18} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
