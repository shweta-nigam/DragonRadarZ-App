import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Character } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useFavorites } from "../context/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CharacterDetail"
>;

type Props = {
  item: Character;
  variant?: "default" | "compact" | "home";
};

export default function CharacterCard({ item, variant = "default" }: Props) {
  const navigation = useNavigation<NavigationProp>();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(item.id);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate("CharacterDetail", { id: item.id })}
    >
      <View
        style={[
          styles.card,
          variant === "home" && styles.homeCard,
          variant === "compact" && styles.compactCard,
        ]}
      >
        {/* fav  */}
        <TouchableOpacity
          style={styles.favButton}
          onPress={(e) => {
            e.stopPropagation(); // prevents navigation
            if (fav) {
              removeFavorite(item.id);
            } else {
              addFavorite({
                id: item.id,
                name: item.name,
                image: item.image,
                type: "character",
              });
            }
          }}
        >
          <Ionicons
            name={fav ? "star" : "star-outline"}
            size={22}
            color={fav ? "#f1c40f" : "#ccc"}
          />
        </TouchableOpacity>

        {/* 🧍 IMAGE LEFT */}
        <Image
          source={{ uri: item.image }}
          style={variant === "home" ? styles.image : styles.listImage}
          resizeMode="contain"
        />

        {/* 📄 INFO RIGHT */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>

          {variant !== "compact" && (
            <>
              <Text style={styles.info}>{item.race}</Text>
              <Text style={styles.info}>Ki: {item.ki}</Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  /* 🔥 MAIN CARD */
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    marginBottom: 14,
    borderRadius: 16,

    // 🎨 purple-blue theme
    backgroundColor: "#1f1b3a",

    // 💎 border glow effect
    borderWidth: 1,
    borderColor: "rgba(162,155,254,0.3)",

    // 🧊 shadow depth
    shadowColor: "#6c5ce7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  /* 🏠 HOME SCREEN VARIANT */
  homeCard: {
    backgroundColor: "#2a2250",
    borderColor: "rgba(108,92,231,0.4)",
  },

  /* 📦 COMPACT (optional horizontal use) */
  compactCard: {
    width: 140,
    flexDirection: "column",
    alignItems: "center",
    padding: 12,
  },
  listImage: {
    marginRight: 120,
    width: 90,
    height: 120,
  },

  /* 🧍 IMAGE */
  image: {
    width: 90,
    height: 120,
    marginRight: 12,
  },

  /* 📄 INFO */
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },

  info: {
    fontSize: 14,
    color: "#b2b2ff",
  },
  favButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
