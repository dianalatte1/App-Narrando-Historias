import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
//todas las librerias que necesites para tu componente
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const CreateStoryScreen = (props) => {
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
  //cargamos la fuente aqui
  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });
  const [previewImage, setPreviewImage] = useState("image_1");
  const [dropDownHeight, setDropDownHeight] = useState(40);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [moral, setMoral] = useState("");
  const [story, setStory] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Image 1", value: "image_1" },
    { label: "Image 2", value: "image_2" },
    { label: "Image 3", value: "image_3" },
    { label: "Image 4", value: "image_4" },
    { label: "Image 5", value: "image_5" },
  ]);
  if (!loaded) {
    return <AppLoading />;
  } else {
    let preview_images = {
      image_1: require("../assets/story_image_1.png"),
      image_2: require("../assets/story_image_2.png"),
      image_3: require("../assets/story_image_3.png"),
      image_4: require("../assets/story_image_4.png"),
      image_5: require("../assets/story_image_5.png"),
    };
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
              Nueva Historia
            </Text>
          </View>
        </View>
        <View style={styles.fieldsContainer}>
          <ScrollView>
            <Image
              source={preview_images[previewImage]}
              style={styles.previewImage}
            ></Image>
            <View style={{ height: RFValue(dropDownHeight) }}>
              <DropDownPicker
                items={items}
                setItems={setItems}
                open={open}
                setOpen={setOpen}
                setValue={setPreviewImage}
                listMode={"SCROLLVIEW"}
                defaultValue={previewImage}
                containerStyle={{
                  height: 40,
                  borderRadius: RFValue(20),
                  marginBottom: RFValue(20),
                  marginHorizontal: RFValue(10),
                }}
                onOpen={() => {
                  setDropDownHeight(220);
                }}
                onClose={() => {
                  setDropDownHeight(40);
                }}
                // style={{ backgroundColor: "transparent" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                // cambiamos esto
                dropDownStyle={{ backgroundColor: theme ? "#eee" : "#2f345d" }}
                // cambiamos esto
                labelStyle={
                  theme ? styles.dropdownLabelLight : styles.dropdownLabel
                }
                // cambiamos esto
                arrowStyle={
                  theme ? styles.dropdownLabelLight : styles.dropdownLabel
                }
                onValueChange={(item) => setPreviewImage(item.value)}
              />
            </View>
            <View style={{ marginHorizontal: RFValue(10) }}>
              {/* cambiamos esto */}
              <TextInput
                style={[
                  theme ? styles.inputFontLight : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(title) => {
                  setTitle(title);
                }}
                placeholder="Titulo"
                // cambiamos esto
                placeholderTextColor={theme ? "black" : "white"}
              />
              <TextInput
                // cambiamos esto
                style={[
                  theme ? styles.inputFontLight : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(description) => setDescription(description)}
                placeholder={"Descripción"}
                multiline={true}
                numberOfLines={4}
                // cambiamos esto
                placeholderTextColor={theme ? "black" : "white"}
              />
              <TextInput
                style={[
                  // cambiamos esto
                  theme ? styles.inputFontLight : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(story) => {
                  setStory(story);
                }}
                placeholder={"Historia"}
                multiline={true}
                numberOfLines={20}
                // cambiamos esto
                placeholderTextColor={theme ? "black" : "white"}
              />
              <TextInput
                style={[
                  // cambiamos esto
                  theme ? styles.inputFontLight : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(moral) => {
                  setMoral(moral);
                }}
                placeholder={"Moraleja de la historia"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={theme ? "black" : "white"}
              />
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 0.08 }} />
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
  // Estos estilos se agregaron despues
  fieldsContainer: {
    flex: 0.85,
    // height: 5,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
    fontFamily: "Bubblegum-Sans",
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
  dropdownLabel: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },
  dropdownLabelLight: {
    color: "black",
    fontFamily: "Bubblegum-Sans",
  },
});
//No olvides exportar tu componente
export default CreateStoryScreen;
