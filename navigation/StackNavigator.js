import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
// import CreateStoryScreen from "../screens/CreateStoryScreen";
import StoryScreen from "../screens/StoryScreen";
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Inicio" component={TabNavigator} />
      <Stack.Screen name="PantallaHistoria" component={StoryScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
