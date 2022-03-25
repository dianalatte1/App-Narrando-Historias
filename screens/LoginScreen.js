import React, { useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";

import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import * as Google from "expo-google-app-auth";

const LoginScreen = () => {
  const isUserEqual = (googleUser, firebaseUser) => {
    const auth = getAuth();
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // No necesitamos reautorizar la conexión con Firebase.
          return true;
        }
      }
    }
    return false;
  };

  const onSignIn = (googleUser) => {
    const auth = getAuth();
    let unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      unsubscribe();
      if (!isUserEqual(googleUser, firebaseUser)) {
        const credential = GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        console.log(credential);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = firebaseUser.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };

  // signInWithGoogleAsync
  async function signInWithGoogleAsync() {
    console.log("hola mundo1");
    try {
      const result = await Google.logInAsync({
        // androidClientId:
        //   "536744882757-vfgvh9qfqlkd0vqpu4sld7g0iajbgjq0.apps.googleusercontent.com",
        iosClientId:
          "536744882757-1regbrs1c3pgda09ddvqhmj18b1d57kj.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("hola mundo2");
        console.log(result);
        onSignIn(result);
        return result.accessToken;
      } else {
        console.log("hola mundo3");
        return { cancelled: true };
      }
    } catch (e) {
      console.log("hola mundo4", e);
      return { error: true };
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="Iniciar sesión con Google"
        onPress={() => signInWithGoogleAsync()}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
