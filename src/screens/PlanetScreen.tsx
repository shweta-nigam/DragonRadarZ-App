import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getPlanets, Planet } from "../services/api";
import PlanetCard from "../components/PlanetCard";
import Loader from "../components/Loader";
import ErrorView from "../components/ErrorView";

export default function PlanetListScreen() {
 const [planets, setPlanets] = useState<Planet[]>([]);
const [filtered, setFiltered] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // fetch once
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await getPlanets();
        setPlanets(res.items || res);
        setFiltered(res.items || res);
      } catch {
        setError("Failed to load planets");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  // local search (no API call)
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(planets);
    } else {
      const s = search.toLowerCase();
      setFiltered(
        planets.filter((p) => p.name.toLowerCase().includes(s))
      );
    }
  }, [search, planets]);

  if (loading) return <Loader />;
  if (error) return <ErrorView message={error} />;

  return (
    <ImageBackground
      source={require("../../assets/dragon-bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* search UI reused */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#aaa" />

        <TextInput
          placeholder="Search planets..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PlanetCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#fff",
    fontSize: 14,
  },
});