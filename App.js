import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import NumPad from "./components/NumPad";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <NumPad />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safe: {
    flex: 1,
    justifyContent: "space-around"
  }
});
