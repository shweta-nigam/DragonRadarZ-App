import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ImageBackground,
} from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import CharacterCard from "../components/CharacterCard";
import PlanetCard from "../components/PlanetCard";


export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  const characters = favorites.filter((item) => item.type === "character");
  const planets = favorites.filter((item) => item.type === "planet");

  const sections = [
    {
      title: "Favorite Characters",
      data: characters,
      type: "character",
    },
    {
      title: "Favorite Planets",
      data: planets,
      type: "planet",
    },
  ].filter((section) => section.data.length > 0);

  if (favorites.length === 0) {
    return (
      <ImageBackground
        source={require("../../assets/dragon-bg.png")} 
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.center}>
          <Text style={styles.emptyText}>No favorites yet</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/dragon-bg.png")} 
      style={styles.bg}
      resizeMode="cover"
    >
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        renderSectionHeader={({ section }) => (
          <Text style={styles.section}>{section.title}</Text>
        )}
      renderItem={({ item, section }) => {
  if (section.type === "character") {
    return <CharacterCard item={item as any} />;
  }
  return <PlanetCard item={item as any} />;
}}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  container: {
    padding: 12,
    paddingBottom: 20,
    marginTop:30
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A05A2",
    marginBottom: 10,
    marginTop: 10,
    backgroundColor:"#F77F00",
    padding:10,
    borderRadius:16,
    borderColor:"#1A05A2",
    

  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#fff",
    fontSize: 16,
  },
});