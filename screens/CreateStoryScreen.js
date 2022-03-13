import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
} from "react-native";
//todas las librerias que necesites para tu componente
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const CreateStoryScreen = (props) => {
  //cargamos la fuente aqui
  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });

  renderItem = ({ item: story }) => {
    return <StoryCard story={story} />;
  };

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
            <Text style={styles.appTitleText}>Nueva Historia</Text>
          </View>
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
});
//No olvides exportar tu componente
export default CreateStoryScreen;
