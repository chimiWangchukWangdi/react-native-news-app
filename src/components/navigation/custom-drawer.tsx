import React from "react";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faList, faSearch } from "@fortawesome/free-solid-svg-icons";
import { View, Text } from "react-native";

function CustomDrawer(props: DrawerContentComponentProps) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate("Home")}
        icon={() => <FontAwesomeIcon icon={faHome} size={18} color="#007AFF" />}
      />
      <DrawerItem
        label="Category"
        onPress={() => navigation.navigate("Category")}
        icon={() => <FontAwesomeIcon icon={faList} size={18} color="#007AFF" />}
      />
      <DrawerItem
        label="Search"
        onPress={() => navigation.navigate("Search")}
        icon={() => (
          <FontAwesomeIcon icon={faSearch} size={18} color="#007AFF" />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
