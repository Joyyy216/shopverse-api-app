import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({
  value,
  onChangeText,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍 Search product..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    fontSize: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 4,
  },
});