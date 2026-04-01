import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { FlatList } from "react-native";
import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const { characters, loading } = useCharacters();
  const topCharacters = characters.slice(0, 10);

  const navigation = useNavigation();

  //  FALL ANIMATIONS
  const fall1 = useRef(new Animated.Value(-200)).current;
  const fall2 = useRef(new Animated.Value(-200)).current;
  const fall3 = useRef(new Animated.Value(-200)).current;
  const fall4 = useRef(new Animated.Value(-200)).current;

  const opacity = useRef(new Animated.Value(0)).current;

  //  SCROLL (PARALLAX)
  const scrollY = useRef(new Animated.Value(0)).current;

  // LOGO + BUTTON GLOW
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Falling sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fall1, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fall2, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(fall3, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fall4, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();

    // Glow loop (logo + button)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.08,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* 🎬 PARALLAX VIDEO BACKGROUND */}
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 500],
                  outputRange: [0, -150],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <Video
          source={require("../../assets/bg-vid.mp4")}
          style={StyleSheet.absoluteFillObject}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted
        />
      </Animated.View>

      {/* 📜 SCROLLABLE CONTENT */}
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 300 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* LOGO */}
        <Animated.View
          style={[
            styles.logo,
            { transform: [{ translateY: fall1 }], opacity },
          ]}
        >
          <Image
            source={require("../../assets/app-logo2.webp")}
            style={{ width: 200, height: 100 }}
            resizeMode="contain"
          />
        </Animated.View>

        {/* RADAR CARD */}
        <Animated.View
          style={[
            styles.radarCard,
            { transform: [{ translateY: fall2 }], opacity },
          ]}
        >
          <Image
            source={require("../../assets/radar-img.webp")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </Animated.View>

        {/* CENTER LOGO */}
        <Animated.View
          style={[
            styles.centerContainer,
            { transform: [{ translateY: fall3 }], opacity },
          ]}
        >
          <Animated.Image
            source={require("../../assets/logo-center.webp")}
            style={[
              styles.centerLogo,
              { transform: [{ scale }] },
            ]}
            resizeMode="contain"
          />

          <View style={styles.whiteLine} />
          <View style={styles.orangeLine} />
        </Animated.View>

        {/* CHARACTERS */}
        <Animated.View
          style={[
            { marginTop: 30 },
            { transform: [{ translateY: fall4 }], opacity },
          ]}
        >
          <FlatList
            data={topCharacters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ marginRight: 12, marginLeft: 14 }}>
                <CharacterCard item={item} variant="home" />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              loading ? (
                <Text style={{ color: "#fff" }}>Loading...</Text>
              ) : null
            }
          />
        </Animated.View>

        {/* 🌍 EXPLORE PLANETS BUTTON */}
        <Animated.View
          style={[
            styles.exploreBtnContainer,
            { transform: [{ scale }] },
          ]}
        >
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => navigation.navigate("Planets")}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreText}>🌍 Explore Planets</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.ScrollView>

       <LinearGradient
    colors={["transparent", "#2b0a3d", "#540979"]}
    style={styles.bottomFade}
  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  logo: {
    alignItems: "flex-start",
    marginTop: 50,
    marginLeft: 16,
  },
  radarCard: {
    height: 200,
    margin: 16,
    borderRadius: 20,
    backgroundColor: "#1e2a5a",
    overflow: "hidden",
  },
  centerContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  centerLogo: {
    width: 300,
    height: 160,
  },
  whiteLine: {
    width: "90%",
    height: 2,
    backgroundColor: "white",
    borderRadius: 9,
    marginTop: 10,
  },
  orangeLine: {
    width: "90%",
    height: 2,
    backgroundColor: "orange",
    borderRadius: 9,
    marginTop: 4,
  },
  exploreBtnContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  exploreBtn: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: "rgba(255,140,0,0.95)",
    shadowColor: "#ff9900",
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 10,
  },
  exploreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomFade: {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: 200, 
},
});