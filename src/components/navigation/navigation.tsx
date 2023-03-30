import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from "./bottom-tabs";
import CustomDrawer from "./custom-drawer";

const Drawer = createDrawerNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
                <Drawer.Screen name="News App" component={BottomTabs} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;