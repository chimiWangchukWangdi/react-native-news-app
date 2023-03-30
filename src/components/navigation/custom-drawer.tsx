import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faPerson, faSearch } from "@fortawesome/free-solid-svg-icons";

function CustomDrawer(props:any) {
    const { navigation } = props;
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label="Home"
                onPress={() => navigation.navigate("Home")}
                icon={() => <FontAwesomeIcon icon={faHome} size={18} color="tomato" />}
            />
            <DrawerItem
                label="Category"
                onPress={() => navigation.navigate("Category")}
                icon={() => <FontAwesomeIcon icon={faSearch} size={18} color="tomato" />}

            />
            <DrawerItem
                label="Profile"
                onPress={() => navigation.navigate("Profile")}
                icon={() => <FontAwesomeIcon icon={faPerson} size={18} color="tomato" />}

            />
        </DrawerContentScrollView>
    );
}

export default CustomDrawer;