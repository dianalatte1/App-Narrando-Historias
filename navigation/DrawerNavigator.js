import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./TabNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import StackNavigator from "./StackNavigator";
import LogoutScreen from "../screens/LogoutScreen";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={StackNavigator} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Cerrar Sesión" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
