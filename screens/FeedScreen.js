import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
} from "react-native";
//todas las librerias que necesites para tu componente
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { FlatList } from "react-native-gesture-handler";
import StoryCard from "./StoryCard";

const FeedScreen = (props) => {
  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });

  let stories = require("./temp.json");
  //Aquí va toda la funcionalidad que quieras para tu
  //componente

  const renderItem = ({ item: story }) => {
    return <StoryCard story={story} />;
  };

  const keyExtractor = (item, index) => index.toString();

  if (!loaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.iconImage}
            ></Image>
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text style={styles.appTitleText}>
              Aplicación para narrar historias
            </Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <FlatList
            keyExtractor={keyExtractor}
            data={stories}
            renderItem={renderItem}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  //Aquí van todos los estilos para tu componente
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
  appIcon: {
    flex: 0.3,
  },
  iconImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginLeft: 10,
  },
  appTitleTextContainer: {
    // flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: 28,
    fontFamily: "Bubblegum-Sans",
    paddingLeft: 20,
    // flexShrink: 1,
  },
  cardContainer: {
    flex: 0.85,
  },
});
//No olvides exportar tu componente
export default FeedScreen;
