import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ProductCard({
  item,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text
        style={styles.title}
        numberOfLines={2}
      >
        {item.title}
      </Text>

      <Text style={styles.category}>
        {item.category}
      </Text>

      <Text style={styles.price}>
        ${item.price}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",

    marginHorizontal: 20,
    marginBottom: 18,

    padding: 15,

    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 5,
  },

  image: {
    width: "100%",
    height: 180,
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  category: {
    marginTop: 8,
    color: "#666",
    fontSize: 15,
    textTransform: "capitalize",
  },

  price: {
    marginTop: 10,
    color: "#2563EB",
    fontSize: 20,
    fontWeight: "bold",
  },
});