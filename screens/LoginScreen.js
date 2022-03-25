import React, { useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import { getDatabase, ref, set } from "firebase/database";

import {
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
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
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
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
