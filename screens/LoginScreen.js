import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Text,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { getDatabase, ref, set } from "firebase/database";

import {
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as Google from "expo-google-app-auth";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const LoginScreen = () => {
  // adding fonts
  const [loaded] = useFonts({
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  });

  const isUserEqual = (googleUser, firebaseUser) => {
    const auth = getAuth();
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const onSignIn = (googleUser) => {
    const auth = getAuth();
    let unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      unsubscribe();
      if (!isUserEqual(googleUser, firebaseUser)) {
        const credential = GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        try {
          // este result regresa user credential
          const result = await signInWithCredential(auth, credential);

          console.log(Object.keys(result));
          console.log(JSON.stringify(result));
          console.log(result.user);

          const aditional = getAdditionalUserInfo(result);
          console.log(aditional);
          if (aditional.isNewUser) {
            const db = getDatabase();
            set(ref(db, "users/" + result.user.uid), {
              gmail: aditional.profile.email,
              profile_picture: aditional.profile.picture,
              locale: aditional.profile.locale,
              first_name: aditional.profile.given_name,
              last_name: aditional.profile.family_name,
              current_theme: "dark",
            });
          }
        } catch (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The credential that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log({ errorCode, errorMessage, email, credential });
        }
      } else {
        console.log("User signed out");
      }
    });
  };

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        // coloca aqui tus credenciales entre comillas
        androidClientId:
          // android aqui
          "536744882757-vfgvh9qfqlkd0vqpu4sld7g0iajbgjq0.apps.googleusercontent.com",
        iosClientId:
          // ios aqui
          "536744882757-1regbrs1c3pgda09ddvqhmj18b1d57kj.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  if (!loaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.appIcon}
          ></Image>
          <Text
            style={styles.appTitleText}
          >{`Aplicación para narrar historias`}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => signInWithGoogleAsync()}
          >
            <Image
              source={require("../assets/google_icon.png")}
              style={styles.googleIcon}
            ></Image>
            <Text style={styles.googleText}>Iniciar sesión con google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cloudContainer}>
          <Image
            source={require("../assets/cloud.png")}
            style={styles.cloudImage}
          ></Image>
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
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  appIcon: {
    width: RFValue(130),
    height: RFValue(130),
    resizeMode: "contain",
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
  },
  googleIcon: {
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: "contain",
  },
  googleText: {
    color: "black",
    fontSize: RFValue(20),
    fontFamily: "Bubblegum-Sans",
  },
  cloudContainer: {
    flex: 0.3,
  },
  cloudImage: {
    position: "absolute",
    width: "100%",
    resizeMode: "contain",
    bottom: RFValue(-5),
  },
});

export default LoginScreen;
