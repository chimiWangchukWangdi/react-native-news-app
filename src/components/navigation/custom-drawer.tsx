import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faList,
  faSearch,
  faRss,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { setIsLoggedOut } from "../../state/auth-state/authSlice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAppDispatch } from "../../state/store";
import auth from "@react-native-firebase/auth";

function CustomDrawer(props: DrawerContentComponentProps) {
  const { navigation } = props;

  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    console.log("this is handleLogOut - 1");
    const user = auth().currentUser;
    if (user) {
      try {
        console.log("this is inside handleLogOut - 2");
        await GoogleSignin.revokeAccess();
        console.log("this is inside handleLogOut - 3");
        await GoogleSignin.signOut();
        await auth()
          .signOut()
          .then(() => console.log("User signed out!"));
        console.log("this is inside handleLogOut - 4");
        dispatch(setIsLoggedOut());
        console.log("this is inside handleLogOut - 5");
      } catch {
        (error: any) => console.log("this is handleLogOut error", error);
      }
    }
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
        icon={() => <FontAwesomeIcon icon={faRss} size={18} color="#3182CE" />}
      />
      <DrawerItem
        label="log-out"
        onPress={() => handleLogOut()}
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
