// BottomNav.js
import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <BlurView intensity={50} tint="light" style={styles.navContainer}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Home")}>
        <Image source={require("./assets/home.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Rockets")}>
        <Image source={require("./assets/rockets.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Favorites")}>
        <Image source={require("./assets/favorites.png")} style={styles.icon} />
      </TouchableOpacity>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    bottom: 20,
    width: "55%",
    left: 90,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  navButton: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
