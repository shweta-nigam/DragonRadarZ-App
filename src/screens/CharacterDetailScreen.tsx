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
import { getCharacterById, CharacterDetails } from "../services/api";

/* route type */
type RouteParams = {
  params: {
    id: number;
  };
};

export default function CharacterDetailScreen() {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { id } = route.params;

  const [character, setCharacter] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      const data = await getCharacterById(id);
      setCharacter(data);
      setError(null);
    } catch (err) {
      setError("Failed to load character");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#8e44ad" />
      </View>
    );
  }

  if (error || !character) {
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
        
        {/* 🔥 CHARACTER IMAGE */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: character.image }}
            style={styles.image}
            resizeMode="contain" 
          />
        </View>

        {/* 🔥 INFO CARD */}
        <View style={styles.card}>
          <Text style={styles.name}>{character.name}</Text>

          <Text style={styles.info}>Race: {character.race}</Text>
          <Text style={styles.info}>Gender: {character.gender}</Text>
          <Text style={styles.info}>Ki: {character.ki}</Text>
          <Text style={styles.info}>Max Ki: {character.maxKi}</Text>
          <Text style={styles.info}>
            Affiliation: {character.affiliation}
          </Text>
        </View>

        {/* 🔥 DESCRIPTION */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {character.description}
          </Text>
        </View>

        {/* 🌍 PLANET */}
        {character.originPlanet && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Origin Planet</Text>

            <Image
              source={{ uri: character.originPlanet.image }}
              style={styles.planetImage}
              resizeMode="cover"
            />

            <Text style={styles.planetName}>
              {character.originPlanet.name}
            </Text>
          </View>
        )}

        {/* ⚡ TRANSFORMATIONS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Transformations</Text>

          {character.transformations.length === 0 ? (
            <Text style={styles.info}>
              No transformations available
            </Text>
          ) : (
            character.transformations.map((t) => (
              <View key={t.id} style={styles.transformationCard}>
                <Image
                  source={{ uri: t.image }}
                  style={styles.transImage}
                  resizeMode="contain"
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.transName}>{t.name}</Text>
                  <Text style={styles.info}>Ki: {t.ki}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* 🎨 STYLES */
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
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)", // glass
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

  planetImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 6,
  },

  planetName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  transformationCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },

  transImage: {
    width: 80,
    height: 100,
  },

  transName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0c29",
  },
});