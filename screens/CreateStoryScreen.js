import React from "react";
import { View, Text, StyleSheet } from "react-native";
//todas las librerias que necesites para tu componente

const CreateStoryScreen = (props) => {
  //Aquí va toda la funcionalidad que quieras para tu
  //componente
  return (
    <View style={styles.container}>
      <Text>Crea tu historia</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //Aquí van todos los estislos para tu componente
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
//No olvides exportar tu componente
export default CreateStoryScreen;
