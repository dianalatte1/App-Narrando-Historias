import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ProfileScreen = (props) => {
  //Aquí va toda la funcionalidad que quieras para tu
  //componente
  return (
    <View style={styles.container}>
      <Text>Perfil</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //Aquí van todos los estilos para tu componente
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
//No olvides exportar tu componente
export default ProfileScreen;
