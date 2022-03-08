import { React } from "react";
import { StyleSheet, Text, View } from "react-native";

//importando cosas que usaremos
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//importando nuestro componentes
import FeedScreen from "./screens/FeedScreen";
import CreateStoryScreen from "./screens/CreateStoryScreen";

//para usar createBottomTabNavigator

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Feed") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "CreateStory") {
              iconName = focused ? "create" : "create-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Índice" component={FeedScreen} />
        <Tab.Screen name="Crear Historia" component={CreateStoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
