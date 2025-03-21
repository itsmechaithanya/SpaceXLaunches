// details.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";

export default function Details({ route }) {
  const { launch } = route.params;
  const [rocket, setRocket] = useState(null);
  const [payloads, setPayloads] = useState([]);
  const [launchpad, setLaunchpad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch rocket
        const rocketRes = await fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`);
        const rocketData = await rocketRes.json();
        setRocket(rocketData);

        // Fetch payloads
        const payloadPromises = launch.payloads.map((id) =>
          fetch(`https://api.spacexdata.com/v4/payloads/${id}`).then((res) => res.json())
        );
        const payloadData = await Promise.all(payloadPromises);
        setPayloads(payloadData);

        // Fetch launchpad
        const launchpadRes = await fetch(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`);
        const launchpadData = await launchpadRes.json();
        setLaunchpad(launchpadData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching launch details:", error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [launch]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const launchDate = new Date(launch.date_utc).toLocaleString();
  const successStatus =
    launch.success === null ? "N/A" : launch.success ? "Success" : "Failed";
  const missionPatch = launch.links?.patch?.small;

  return (
    <View style={styles.container}>
      <Text style={styles.itemTitle}>{launch.name}</Text>
      <Text>Date: {launchDate}</Text>
      <Text>Status: {successStatus}</Text>
      {rocket && <Text>Rocket: {rocket.name}</Text>}
      {launchpad && <Text>Launch Site: {launchpad.name}</Text>}
      {missionPatch ? (
        <Image source={{ uri: missionPatch }} style={styles.patchImage} />
      ) : (
        <Text>No Mission Patch</Text>
      )}

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Payloads:</Text>
      {payloads.map((payload) => (
        <View key={payload.id} style={styles.payloadContainer}>
          <Text>ID: {payload.id}</Text>
          {payload.name && <Text>Name: {payload.name}</Text>}
          {payload.type && <Text>Type: {payload.type}</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  patchImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginVertical: 10,
  },
  payloadContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    borderRadius: 3,
  },
});
