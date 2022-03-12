import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
//todas las librerias que necesites para tu componente
import { useFonts } from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import { FlatList } from "react-native-gesture-handler";
import StoryCard from "./StoryCard";

const FeedScreen = (props) => {
  //Aquí va toda la funcionalidad que quieras para tu
  //componente
  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });

  let stories = require("./temp.json");

  renderItem = ({ item: story }) => {
    return <StoryCard story={story} />;
  };

  keyExtractor = (item, index) => index.toString();

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
    justifyContent: "center",
    alignItems: "center",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.93,
  },
});
//No olvides exportar tu componente
export default FeedScreen;
