import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as Speech from "expo-speech";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const StoryScreen = (props) => {
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
  const [speakerColor, setSpeakerColor] = useState("gray");
  const [speakerIcon, setSpeakerIcon] = useState("volume-high-outline");

  const initiateTTS = async (title, author, story, moral) => {
    const current_color = speakerColor;
    // agregamos la opciones de lenguage, para que lea en español
    const speakOptions = { language: "es-MX" };
    setSpeakerColor(current_color === "gray" ? "#ee8249" : "gray");
    if (current_color === "gray") {
      Speech.speak(`${title} by ${author}`, speakOptions); //, speakOptions
      Speech.speak(story, speakOptions);
      Speech.speak("¡La moraleja de la historia es!", speakOptions);
      Speech.speak(moral, speakOptions);
    } else {
      Speech.stop();
    }
  };
  if (!props.route.params) {
    props.navigation.navigate("Home");
  } else if (!loaded) {
    return <AppLoading />;
  } else {
    return (
      // cambiamos esto
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
            {/* cambiamos esto */}
            <Text
              style={theme ? styles.appTitleTextLight : styles.appTitleText}
            >
              Aplicación para narrar historias
            </Text>
          </View>
        </View>
        <View style={styles.storyContainer}>
          {/* cambiamos esto */}
          <ScrollView style={theme ? styles.storyCardLight : styles.storyCard}>
            <Image
              source={require("../assets/story_image_1.png")}
              style={styles.image}
            ></Image>

            <View style={styles.dataContainer}>
              <View style={styles.titleTextContainer}>
                <Text
                  // cambiamos esto
                  style={
                    theme ? styles.storyTitleTextLight : styles.storyTitleText
                  }
                >
                  {props.route.params.story.title}
                </Text>
                <Text
                  // cambiamos esto
                  style={
                    theme ? styles.storyAuthorTextLight : styles.storyAuthorText
                  }
                >
                  {props.route.params.story.author}
                </Text>
                <Text style={styles.storyAuthorText}>
                  {props.route.params.story.created_on}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() =>
                    initiateTTS(
                      props.route.params.story.title,
                      props.route.params.story.author,
                      props.route.params.story.story,
                      props.route.params.story.moral
                    )
                  }
                >
                  <Ionicons
                    name={speakerIcon}
                    size={RFValue(30)}
                    color={speakerColor}
                    style={{ margin: RFValue(15) }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.storyTextContainer}>
              {/* cambiamos esto */}
              <Text style={theme ? styles.storyTextLight : styles.storyText}>
                {props.route.params.story.story}
              </Text>
              {/* cambiamos esto */}
              <Text style={theme ? styles.moralTextLight : styles.moralText}>
                Moral - {props.route.params.story.moral}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.likeButton}>
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                <Text style={theme ? styles.likeTextLight : styles.likeText}>
                  12m
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
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
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  storyContainer: {
    flex: 1,
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20),
  },
  storyCardLight: {
    margin: RFValue(20),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain",
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20),
  },
  titleTextContainer: {
    flex: 0.8,
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white",
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white",
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black",
  },
  iconContainer: {
    flex: 0.2,
  },
  storyTextContainer: {
    padding: RFValue(20),
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white",
  },
  storyTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "black",
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white",
  },
  moralTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "black",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
export default StoryScreen;
