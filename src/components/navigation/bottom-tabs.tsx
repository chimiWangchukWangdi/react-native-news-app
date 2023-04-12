import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/home-screen/home-screen";
import CategoryScreen from "../../screens/category-screen/category-screen";
import SearchScreen from "../../screens/search-screen/search-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faSearch, faList, IconDefinition } from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const [open, setOpen] = React.useState(false);

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
          }

          return <FontAwesomeIcon icon={iconName} size={18} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
      sceneContainerStyle={{
        flex: 1,
        paddingBottom: 100
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
    </Tab.Navigator>
  );
}

export default BottomTabs;
