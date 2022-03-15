import React, { useState } from "react";
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
} from "react-native";
//todas las librerias que necesites para tu componente
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
//libreria dropdownpicker
import DropDownPicker from "react-native-dropdown-picker";

const CreateStoryScreen = (props) => {
  //cargamos la fuente aqui
  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });
  //hook para cambiar la imagen
  const [previewImage, setPreviewImage] = useState("image_1");
  //hook para el tamaño de la altura
  const [dropDownHeight, setDropDownHeight] = useState(40);
  //hook para nuestro titulo
  const [title, setTitle] = useState("");
  //hook para nuestra descripcion
  const [description, setDescription] = useState("");
  //hook para guardar nuestra moraleja
  const [moral, setMoral] = useState("");
  //hook para guardar la historia nueva
  const [story, setStory] = useState("");
  //hook para nuestro dropdownview
  const [open, setOpen] = useState(false);
  //hook que guarda las imagenes que puede seleccionar el usuario
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
                  borderRadius: 20,
                  marginBottom: 10,
                }}
                onOpen={() => {
                  setDropDownHeight(170);
                }}
                onClose={() => {
                  setDropDownHeight(40);
                }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#2f345d" }}
                labelStyle={{
                  color: "white",
                  fontFamily: "Bubblegum-Sans",
                }}
                arrowStyle={{
                  color: "white",
                  fontFamily: "Bubblegum-Sans",
                }}
                onValueChange={(item) => setPreviewImage(item.value)}
              />
            </View>
            {/* Descomenta este TextInput es tu ejemplo!!!!! :D  */}
            {/* <TextInput
              style={styles.inputFont}
              onChangeText={(title) => {
                setTitle(title);
              }}
              placeholder="Titulo"
              placeholderTextColor="white"
            /> */}
            <TextInput
            // estilo: inputFont, inputFontExtra, inputTextBig
            //sigue esta estructura: style={[styles.tuEstilo,styles.tuOtroEstilo]}
            // dentro del onChangeText: actualiza setDescription y pasale description
            //coloca un placeholder: placeholder={"texto"}
            //has que sea multiline: multiline={true or false}
            //coloca el numero de lineas: numberOfLines={#}
            //el color del texto del placeholder: placeholderTextColor="el color"
            />
            <TextInput
            //repite los estilos
            // dentro del onChangeText: actualiza setStory y pasale story
            //coloca un placeholder con el texto "Historia"
            //que sea multilinea(true)
            //el numero de lineas seran 20
            //el color de texto sera blanco
            />
            <TextInput
            //repite los estilos
            // dentro del onChangeText: actualiza setMoral y pasale moral
            //coloca un placeholder con el texto "Moraleja de la Historia"
            //que sea multilinea(true)
            //el numero de lineas seran 4
            //el color de texto sera blanco
            />
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
  // Estos estilos se agregaron despues
  fieldsContainer: {
    flex: 0.85,
    height: 5,
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
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
});
//No olvides exportar tu componente
export default CreateStoryScreen;
