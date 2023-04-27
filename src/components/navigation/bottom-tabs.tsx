import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/home-screen/home-screen";
import CategoryScreen from "../../screens/category-screen/category-screen";
import SearchScreen from "../../screens/search-screen/search-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faSearch, faList, IconDefinition, faRss } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getIsDarkMode } from "../../state/newsSlice/newsSlice";
import RssFeedReader from "../../screens/rss-feed-reader";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const [open, setOpen] = React.useState(false);
  const isDarkMode = useSelector(getIsDarkMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName!: IconDefinition;

          if (route.name === "Home") {
            iconName = faHome;
          } else if (route.name === "Category") {
            iconName = faList;
          } else if (route.name === "Search") {
            iconName = faSearch;
          } else if (route.name === "RssFeed") {
            iconName = faRss;
          }

          return <FontAwesomeIcon icon={iconName} size={18} color={color} />;
        },
        tabBarActiveTintColor: "#3182CE",
        tabBarInactiveTintColor: "gray",
      })}
      sceneContainerStyle={{
        flex: 1,
        paddingBottom: 20,
        backgroundColor: isDarkMode ? "#3d3d3d" : "#fff"
      }}
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
      <Tab.Screen
        name="RssFeed"
        component={RssFeedReader}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
