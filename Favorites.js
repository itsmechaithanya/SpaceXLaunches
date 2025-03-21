// Favorites.js
import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FavoritesContext } from "./FavoritesContext";

export default function Favorites({ navigation }) {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const renderItem = ({ item }) => {
    const launchDate = new Date(item.date_utc).toLocaleDateString();
    const patchImage = item.links?.patch?.small;
    const title = item.name || "No Title";

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Details", { launch: item })}
      >
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDate}>Date: {launchDate}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFavorite(item)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
        {patchImage ? (
          <Image source={{ uri: patchImage }} style={styles.patchImage} />
        ) : (
          <View style={styles.noImage}>
            <Text style={{ color: "#999" }}>No Image</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noFavorites}>No favorites yet!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={styles.header}>Your Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: "center", justifyContent: "center",  },
  header: { fontSize: 30, fontWeight: "700", marginVertical: 20, marginTop: 60, height:'15%', padding:20, width:'50%'},
  noFavorites: { fontSize: 18, color: "#666" },
  card: {
    flexDirection: "row",
    backgroundColor: "#F3F2FE",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: { flex: 1, marginRight: 10 },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  cardDate: { fontSize: 15, color: "#666", marginBottom: 12 },
  removeButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  removeButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  patchImage: { width: 60, height: 60, resizeMode: "contain" },
  noImage: {
    width: 100,
    height: 100,
    backgroundColor: "#ddd",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});
