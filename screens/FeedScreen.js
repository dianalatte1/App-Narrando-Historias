import React, { useState, useEffect } from "react";
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
import { RFValue } from "react-native-responsive-fontsize";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { FlatList } from "react-native-gesture-handler";
import StoryCard from "./StoryCard";

import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const FeedScreen = ({ navigation }) => {
  const [theme, setTheme] = useState(true);
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

  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });

  let stories = require("./temp.json");
  //Aquí va toda la funcionalidad que quieras para tu
  //componente

  const renderItem = ({ item: story }) => {
    return <StoryCard story={story} navigation={navigation} />;
  };

  const keyExtractor = (item, index) => index.toString();

  if (!loaded) {
    return <AppLoading />;
  } else {
    return (
      // esto cambia
      <View style={theme ? styles.containerLight : styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.iconImage}
            ></Image>
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text
              style={theme ? styles.appTitleTextLight : styles.appTitleText}
            >
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
  containerLight: {
    flex: 1,
    backgroundColor: "white",
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
    justifyContent: "center",
    alignItems: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: 28,
    fontFamily: "Bubblegum-Sans",
    paddingLeft: 20,
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.85,
  },
});
//No olvides exportar tu componente
export default FeedScreen;
