import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function DetailModal({
  visible,
  product,
  onClose,
}) {
  if (!product) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>

        <View style={styles.modal}>

          <ScrollView
            showsVerticalScrollIndicator={false}
          >

            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              {product.title}
            </Text>

            <Text style={styles.price}>
              ${product.price}
            </Text>

            <View style={styles.infoBox}>

              <Text style={styles.label}>
                Category
              </Text>

              <Text style={styles.value}>
                {product.category}
              </Text>

            </View>

            <View style={styles.infoBox}>

              <Text style={styles.label}>
                Rating
              </Text>

              <Text style={styles.value}>
                ⭐ {product.rating.rate} ({product.rating.count} Reviews)
              </Text>

            </View>

            <View style={styles.infoBox}>

              <Text style={styles.label}>
                Description
              </Text>

              <Text style={styles.description}>
                {product.description}
              </Text>

            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>
                Close
              </Text>
            </TouchableOpacity>

          </ScrollView>

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modal: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
  },

  image: {
    width: "100%",
    height: 220,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },

  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 20,
  },

  infoBox: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    textAlign: "justify",
  },

  button: {
    marginTop: 25,
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
});