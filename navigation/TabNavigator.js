import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FeedScreen from "../screens/FeedScreen";
import CreateStoryScreen from "../screens/CreateStoryScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  const [theme, setTheme] = useState(true);
  const [updated, setUpdated] = useState(false);
  const RenderFeed = (props) => {
    return (
      <FeedScreen setUpdatedToFalse={() => setUpdated(false)} {...props} />
    );
  };
  const RenderStory = (props) => {
    return (
      <CreateStoryScreen setUpdatedToTrue={() => setUpdated(true)} {...props} />
    );
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    const userRef = ref(db, "users/" + user.uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      setTheme(data.current_theme === "light");
    });
  }, []);

  return (
    <Tab.Navigator
      labeled={false}
      // cambiamos esto
      barStyle={theme ? styles.bottomTabStyleLight : styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "FeedScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CreateStory") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}
              style={styles.icons}
            />
          );
        },
      })}
      activeColor={"#ee8249"}
      inactiveColor={"gray"}
    >
      <Tab.Screen
        name="FeedScreen"
        component={RenderFeed}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="CreateStory"
        component={RenderStory}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "10%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute",
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});
