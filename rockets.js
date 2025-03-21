import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Rockets() {
  const [rockets, setRockets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v4/rockets");
        const data = await response.json();
        setRockets(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rockets:", error);
        setLoading(false);
      }
    };
    fetchRockets();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.rocketCard}>
      <Text style={styles.rocketTitle}>{item.name}</Text>
      {item.flickr_images && item.flickr_images[0] ? (
        <Image source={{ uri: item.flickr_images[0] }} style={styles.rocketImage} />
      ) : (
        <Text style={styles.noImage}>No Image</Text>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={styles.header}>Rockets: Carving Paths Through The Cosmos</Text>
      <FlatList
        data={rockets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  rocketCard: {
    backgroundColor: "#f5f5ff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  rocketTitle: { fontSize: 18, paddingLeft:10, fontWeight: "600", marginBottom: 10, color: "#333" },
  rocketImage: { width: 320, height: 180, resizeMode: "cover", borderRadius: 8 },
  noImage: { fontSize: 14, color: "#999" },
  header: {
    fontSize: 24,
    width: "70%",
    height: "15%",
    marginTop: 40,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
    color: "#000",
  },
  listContainer: { paddingBottom: 20 },
});
