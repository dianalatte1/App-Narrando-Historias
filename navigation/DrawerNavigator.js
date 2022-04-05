import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import StackNavigator from "./StackNavigator";
import LogoutScreen from "../screens/LogoutScreen";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Inicio"
        component={StackNavigator}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Cerrar Sesión"
        component={LogoutScreen}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
