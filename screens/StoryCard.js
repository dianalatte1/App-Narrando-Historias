import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";

import AppLoading from "expo-app-loading";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";

const StoryCard = (props) => {
  //Ya hemos cargado la fuente!!! :D
  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });
  //mostramos cargando
  if (!loaded) {
    return <AppLoading />;
  } else {
    // si ya se cargo la fuente mostramos nuestro inicio
    return (
      <View style={styles.container}>
        <View>
          {/* El view de arriba tendra cardContainer */}

          <View>
            {/* El view de arriba tendra storyImage */}
            {/* Dentro de este view tendremos una imagen */}
            {/* Esta imagen tendra el estilo storyImage */}
          </View>
          <View>
            {/* El view de arriba tendra el stilo titleContainer */}
            <Text>{/* estilo:storyTitleText, pasa props.story.title, */}</Text>
            <Text>
              {/* estilo:storyAuthorText, pasa props.story.author, */}
            </Text>
            <Text>
              {/* estilo:descriptionText, pasa props.story.description, */}
            </Text>
          </View>
          <View>
            {/* El view de arriba tendra el stilo actionContainer */}
            <View>
              {/* El view de arriba tendra el stilo likeButton */}
              <Ionicons
              // El nombre del icono: 'heart', size:30, color: blanco
              />
              <Text>{/* estilo: likeText */}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  //Pista: estos son los estilos que necesitaras para
  // mostrar el inicio
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20),
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
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
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
});
//No olvides exportar tu componente
export default StoryCard;
