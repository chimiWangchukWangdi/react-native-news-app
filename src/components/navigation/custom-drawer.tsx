import React from "react";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faList, faSearch, faRss, faSignOutAlt  } from "@fortawesome/free-solid-svg-icons";
import { setIsLoggedOut } from "../../state/auth-state/authSlice";
import { useDispatch } from "react-redux";


function CustomDrawer(props: DrawerContentComponentProps) {
  const dispatch = useDispatch();
  const { navigation } = props;

   // Logout handler
   const handleLogout = () => {
    // Dispatch the logout action from authSlice
    dispatch(setIsLoggedOut());
  };

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
        onPress={() => navigation.navigate("Rss Feed")}
        icon={() => (
          <FontAwesomeIcon icon={faRss} size={18} color="#3182CE" />
        )}
      />
      <DrawerItem
        label="log-out"
        onPress={() => handleLogout()}
        icon={() => (
          <FontAwesomeIcon icon={faSignOutAlt} size={18} color="#3182CE" />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

