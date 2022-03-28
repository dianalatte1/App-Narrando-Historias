import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";

const ProfileScreen = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [theme, setTheme] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    const userRef = ref(db, "users/" + user.uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      // console.log(data);

      setTheme(data.current_theme === "light");
      // setIsEnabled(data.current_theme === "light" ? false : true);
      // setIsEnabled(data.current_theme !== "light" ? true : false);
      setIsEnabled(data.current_theme !== "light");

      setName(data.first_name);
      setProfileImage(data.profile_picture);
    });
  }, []);

  const toggleSwitch = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    const previousState = isEnabled;
    const theme = !isEnabled ? "dark" : "light";
    let updates = {
      [`/users/${user.uid}/current_theme`]: theme,
    };
    update(ref(db), updates);
    setIsEnabled(!previousState);
    setTheme(previousState);
  };

  //cargamos la fuente aqui
  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  } else {
    return (
      // <View style={styles.container}>
      //   <Text>Perfil</Text>
      // </View>
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
        <View style={styles.screenContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            ></Image>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={styles.themeContainer}>
            <Text style={styles.themeText}>Tema oscuro</Text>
            <Switch
              style={{
                transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
              }}
              trackColor={{ false: "#767577", true: "white" }}
              thumbColor={isEnabled ? "#ee8249" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={{ flex: 0.3 }} />
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
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
  screenContainer: {
    flex: 0.85,
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
  },
  nameText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10),
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RFValue(20),
  },
  themeText: {
    color: "white",
    fontSize: RFValue(30),
    fontFamily: "Bubblegum-Sans",
    marginRight: RFValue(15),
  },
});
//No olvides exportar tu componente
export default ProfileScreen;
