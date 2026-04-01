import React from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import ErrorView from "../components/ErrorView";

export default function CharacterListScreen() {
  const {
    characters,
    loading,
    error,
    loadMore,
    refresh,
    isFetchingMore,
    setSearch,
  } = useCharacters();

  if (loading && characters.length === 0) {
    return <Loader />;
  }

  if (error && characters.length === 0) {
    return <ErrorView message={error} />;
  }

  return (
    <ImageBackground
      source={require("../../assets/dragon-bg.png")} // 🔥 your image
      style={styles.container}
      resizeMode="cover"
    >
      {/* 🔍 SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#aaa" />

        <TextInput
          placeholder="Search characters..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          onChangeText={setSearch}
        />
      </View>

      {/* 📜 LIST */}
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard item={item}  />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={refresh}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator style={{ margin: 16 }} color="#fff" />
          ) : null
        }
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  /* 🔍 SEARCH BAR */
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // 🔥 darker overlay for readability
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