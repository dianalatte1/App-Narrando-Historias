import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

import AppLoading from "expo-app-loading";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const StoryCard = (props) => {
  //Aquí va toda la funcionalidad que quieras para tu
  //componente
  const [theme, setTheme] = useState(true);
  const [storyId, setStoryId] = useState(props.story.key);
  const [storyData, setStoryData] = useState(props.story.value);

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

  if (!loaded) {
    return <AppLoading />;
  } else {
    let images = {
      image_1: require("../assets/story_image_1.png"),
      image_2: require("../assets/story_image_2.png"),
      image_3: require("../assets/story_image_3.png"),
      image_4: require("../assets/story_image_4.png"),
      image_5: require("../assets/story_image_5.png"),
    };
    console.log("story card", props.story);
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          props.navigation.navigate("PantallaHistoria", {
            story: props.story,
          })
        }
      >
        {/* cambiamos esto */}
        <View style={theme ? styles.cardContainerLight : styles.cardContainer}>
          <Image
            source={images[storyData.preview_image]}
            style={styles.storyImage}
          ></Image>

          <View style={styles.titleContainer}>
            {/* cambiamos esto */}
            <Text
              style={theme ? styles.storyTitleTextLight : styles.storyTitleText}
            >
              {storyData.title}
            </Text>
            {/* cambiamos esto */}
            <Text
              style={
                theme ? styles.storyAuthorTextLight : styles.storyAuthorText
              }
            >
              {storyData.author}
            </Text>
            {/* cambiamos esto */}
            <Text
              style={
                theme ? styles.descriptionTextLight : styles.descriptionText
              }
            >
              {storyData.description}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons
                name={"heart"}
                size={RFValue(30)}
                color={theme ? "black" : "white"}
              />
              <Text style={theme ? styles.likeTextLight : styles.likeText}>
                12m
              </Text>
            </View>
          </View>
        </View>
        {/* </View> */}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  //Aquí van todos los estilos para tu componente
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20),
  },
  cardContainerLight: {
    margin: RFValue(13),

    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2),
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center",
  },
  titleTextContainer: {
    flex: 0.8,
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  storyTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black",
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black",
  },
  descriptionContainer: {
    marginTop: RFValue(5),
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
  },
  descriptionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "black",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
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
//No olvides exportar tu componente
export default StoryCard;
