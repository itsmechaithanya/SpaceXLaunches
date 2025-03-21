// welcome.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Image section (takes ~3/4 of the screen) */}
      <View style={styles.imageContainer}>
        <Image
          source={require("./assets/bg.png")}
          style={styles.bgImage}
        />
      </View>

      {/* Text + Button section (takes ~1/4 of the screen) */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>SpaceX</Text>
        <Text style={styles.subtitle}>Launches Rockets And Spacecraft</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  // Overall container
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Top portion: 3/4 for the image
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  // Bottom portion: 1/4 for text and button
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    position:"absolute",
    bottom:"90%"
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    width: "60%",
    textAlign: "center",
    position:"absolute",
    bottom:"55%"
  },
  button: {
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
