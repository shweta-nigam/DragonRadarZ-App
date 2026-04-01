import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ErrorView({ message }: { message: string }) {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});