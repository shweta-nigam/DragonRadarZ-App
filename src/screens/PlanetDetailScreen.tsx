import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getPlanetById, PlanetDetails } from "../services/api";

/* route type */
type RouteParams = {
  params: {
    id: number;
  };
};

export default function PlanetDetailScreen() {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { id } = route.params;

  const [planet, setPlanet] = useState<PlanetDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanet = async () => {
    try {
      setLoading(true);
      const data = await getPlanetById(id);
      setPlanet(data);
      setError(null);
    } catch (err) {
      setError("Failed to load planet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanet();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#8e44ad" />
      </View>
    );
  }

  if (error || !planet) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>{error || "No data found"}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#24243e"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* PLANET IMAGE */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: planet.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* INFO CARD */}
        <View style={styles.card}>
          <Text style={styles.name}>{planet.name}</Text>

          <Text style={styles.info}>
            Is Destroyed: {planet.isDestroyed ? "Yes" : "No"}
          </Text>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {planet.description}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    padding: 14,
    paddingBottom: 30,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  image: {
    width: "100%",
    height: 260,
    borderRadius: 12,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  info: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a29bfe",
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    color: "#ddd",
    lineHeight: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0c29",
  },
});