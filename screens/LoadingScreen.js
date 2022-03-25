import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const LoadingScreen = (props) => {
  useEffect(() => {
    const checkIfLoggedIn = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          props.navigation.navigate("DashboardScreen");
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          props.navigation.navigate("LoginScreen");
        }
      });
    };
    checkIfLoggedIn();
  }, []);

  return (
    <View styles={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
export default LoadingScreen;
