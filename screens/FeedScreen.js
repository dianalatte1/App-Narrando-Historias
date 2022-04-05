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

const FeedScreen = (props) => {
  const [theme, setTheme] = useState(true);
  const [stories, setStories] = useState([]);
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
  // aqui crear el otro useeffect
  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "posts");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const storiesTemp = [];
      if (!data) {
        return;
      }
      Object.keys(data).forEach((key) => {
        storiesTemp.push({
          key: key,
          value: data[key],
        });
      });
      setStories(storiesTemp);
      props.setUpdatedToFalse();
    });
  }, []);

  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });

  const renderItem = ({ item: story }) => {
    return <StoryCard story={story} navigation={props.navigation} />;
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
        {/* AQUI AGREGAR CODIGO */}
        {!stories[0] ? (
          <View style={styles.noStories}>
            <Text
              style={theme ? styles.noStoriesTextLight : styles.noStoriesText}
            >
              No hay historias disponibles
            </Text>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={keyExtractor}
              data={stories}
              renderItem={renderItem}
            />
          </View>
        )}
        <View style={{ flex: 0.08 }} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
  },
});
//No olvides exportar tu componente
export default FeedScreen;
