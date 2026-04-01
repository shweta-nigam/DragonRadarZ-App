import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../context/FavoritesContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  item: any; // replace with Planet type
  variant?: "default" | "home" | "compact";
};
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PlanetDetail"
>;
export default function PlanetCard({ item, variant = "default" }: Props) {
  const navigation = useNavigation<NavigationProp>();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(item.id);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlanetDetail", { id: item.id })}
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
            e.stopPropagation();
            if (fav) {
              removeFavorite(item.id);
            } else {
              addFavorite({
                id: item.id,
                name: item.name,
                image: item.image,
                type: "planet",
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

        {/* image left, same layout */}
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* info right */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>

          {variant !== "compact" && (
            <>
              <Text style={styles.info}>
                Population: {item.population || "Unknown"}
              </Text>
              <Text style={styles.info}>
                Destroyed: {item.isDestroyed ? "Yes" : "No"}
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 14,
    borderRadius: 16,

    backgroundColor: "#1f1b3a",
    borderWidth: 1,
    borderColor: "rgba(162,155,254,0.3)",

    shadowColor: "#6c5ce7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  homeCard: {
    backgroundColor: "#2a2250",
    borderColor: "rgba(108,92,231,0.4)",
  },

  compactCard: {
    width: 140,
    flexDirection: "column",
    alignItems: "center",
  },

  image: {
    width: 90,
    height: 90,
    marginRight: 14, // spacing between image and text
    borderRadius: 10,
  },

  infoContainer: {
    flex: 1,
    gap: 4,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
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
