import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { FavoritesContext } from "./FavoritesContext";

export default function Home({ navigation }) {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All"); // "All", "Past", "Upcoming"
  const [filterOpen, setFilterOpen] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  // Fetch launches on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const launchResponse = await fetch("https://api.spacexdata.com/v4/launches");
        const launchData = await launchResponse.json();
        // Sort launches by date descending
        launchData.sort((a, b) => new Date(b.date_utc) - new Date(a.date_utc));
        setLaunches(launchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter logic
  const filteredLaunches = launches.filter((launch) => {
    const isPast = new Date(launch.date_utc) < new Date();
    if (filter === "Past") return isPast;
    if (filter === "Upcoming") return !isPast;
    return true;
  });

  // Render each launch card
  const renderItem = ({ item }) => {
    const launchDate = new Date(item.date_utc).toLocaleDateString();
    const patchImage = item.links?.patch?.small;
    const title = item.name || "No Title";

    // Check if the launch is already in favorites
    const isLiked = favorites.some((fav) => fav.id === item.id);

    // Toggle like/dislike
    const handleToggleLike = () => {
      if (isLiked) {
        removeFavorite(item);
      } else {
        addFavorite(item);
      }
    };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Details", { launch: item })}
      >
        {/* Left Side: Name, Date, Like/Dislike Button */}
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDate}>Date: {launchDate}</Text>
          <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleLike}>
            <Text style={styles.favoriteButtonText}>{isLiked ? "Dislike" : "Like"}</Text>
          </TouchableOpacity>
        </View>
        {/* Right Side: Mission Patch Image */}
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>All The Launches Till Date.</Text>
      </View>
      <TouchableOpacity onPress={() => setFilterOpen(!filterOpen)}>
        <Text style={styles.topBarFilter}>{filterOpen ? "Close" : "Filter"}</Text>
      </TouchableOpacity>
      {/* Filter Row */}
      {filterOpen && (
        <View style={styles.filterRow}>
          {["All", "Past", "Upcoming"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.filterOption, filter === option && styles.filterOptionActive]}
              onPress={() => setFilter(option)}
            >
              <Text style={[styles.filterText, filter === option && styles.filterTextActive]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {/* Launch List */}
      <FlatList
        data={filteredLaunches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingTop: 55,
    height: "20%",
    paddingBottom: 10,
  },
  topBarTitle: { fontSize: 30, width: "70%", fontWeight: "700" },
  topBarFilter: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    paddingHorizontal: 25,
    paddingVertical: 10,
    paddingTop: 15,
  },
  filterRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 25,
  },
  filterOption: { marginRight: 20 },
  filterOptionActive: { borderBottomWidth: 1, borderBottomColor: "#000" },
  filterText: { fontSize: 16, color: "#666" },
  filterTextActive: { color: "#000", fontWeight: "bold" },
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
  favoriteButton: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  favoriteButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
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
