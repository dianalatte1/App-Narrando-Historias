import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";

import AppLoading from "expo-app-loading";

const StoryCard = (props) => {
  //Aquí va toda la funcionalidad que quieras para tu
  //componente
  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>¡Tarjeta de historias!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  //Aquí van todos los estilos para tu componente
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
//No olvides exportar tu componente
export default StoryCard;
