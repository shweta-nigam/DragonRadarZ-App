import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image, Text } from "react-native";

// screens
import HomeScreen from "../screens/HomeScreen";
import CharacterListScreen from "../screens/CharacterListScreen";
import PlanetScreen from "../screens/PlanetScreen";
import FavoriteScreen from "../screens/FavoritesScreen";
import CharacterDetailScreen from "../screens/CharacterDetailScreen";
import PlanetDetailScreen from "../screens/PlanetDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* Home Stack */
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
    </Stack.Navigator>
  );
}

/* Character Stack */
function CharacterStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CharacterMain" component={CharacterListScreen} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
    </Stack.Navigator>
  );
}

/* Planet Stack */
function PlanetStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlanetMain" component={PlanetScreen} />
      <Stack.Screen name="PlanetDetail" component={PlanetDetailScreen} />
    </Stack.Navigator>
  );
}

/* Favorite Stack */
function FavoriteStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoriteMain" component={FavoriteScreen} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
    </Stack.Navigator>
  );
}


/* Icon helper */
const getIcon = (routeName: string) => {
  switch (routeName) {
    case "Home":
      return require("../../assets/home-tab-icon.webp");
    case "Characters":
      return require("../../assets/char-tab-icon.webp");
    case "Planets":
      return require("../../assets/planet-tab-icon.webp");
    case "Favorites":
      return require("../../assets/fav-tab-icon.webp");
    default:
      return require("../../assets/home-tab-icon.webp");
  }
};

/* Main Tab Navigator */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          /* tab bar style */
          tabBarStyle: {
            position: "absolute",
            margin: 10,
            borderRadius: 25,
            height: 80,
            backgroundColor: "#3b2f1f",
            borderTopWidth: 0,
            elevation: 10,
          },

          /* label style */
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 6,
          },

          tabBarActiveTintColor: "#FFD700",
          tabBarInactiveTintColor: "#ccc",

          /* icon */
          tabBarIcon: ({ focused }) => {
            const iconSource = getIcon(route.name);

            return (
              <View
                style={{
                  padding: 8,
                  borderRadius: 24,
                }}
              >
                <Image
                  source={iconSource}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Characters" component={CharacterStack} />
        <Tab.Screen name="Planets" component={PlanetStack} />
        <Tab.Screen name="Favorites" component={FavoriteStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}