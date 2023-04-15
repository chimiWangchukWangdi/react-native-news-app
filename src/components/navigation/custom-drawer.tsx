import React from "react";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faList, faSearch, faRss  } from "@fortawesome/free-solid-svg-icons";

function CustomDrawer(props: DrawerContentComponentProps) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate("Home")}
        icon={() => <FontAwesomeIcon icon={faHome} size={18} color="#3182CE" />}
      />
      <DrawerItem
        label="Category"
        onPress={() => navigation.navigate("Category")}
        icon={() => <FontAwesomeIcon icon={faList} size={18} color="#3182CE" />}
      />
      <DrawerItem
        label="Search"
        onPress={() => navigation.navigate("Search")}
        icon={() => (
          <FontAwesomeIcon icon={faSearch} size={18} color="#3182CE" />
        )}
      />
      <DrawerItem
        label="Rss Feed"
        onPress={() => navigation.navigate("RssFeed")}
        icon={() => (
          <FontAwesomeIcon icon={faRss} size={18} color="#3182CE" />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
