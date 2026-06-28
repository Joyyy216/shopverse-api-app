import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";

import api from "./services/api";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import DetailModal from "./components/DetailModal";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  async function fetchProducts() {
  try {
    setLoading(true);
    setError(false);

    // Delay 1 detik agar loading terlihat
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await api.get("/products");

    const data = response.data;

    setProducts(data);
    setFilteredProducts(data);

  } catch (err) {
    console.log(err);
    setError(true);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleSearch(text) {
    setSearch(text);

    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredProducts(filtered);
  }

  async function onRefresh() {
    setRefreshing(true);

    await fetchProducts();

    setRefreshing(false);
  }

  function openDetail(item) {
    setSelectedProduct(item);
    setModalVisible(true);
  }

  function closeDetail() {
    setModalVisible(false);
    setSelectedProduct(null);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loading}>
          Loading products...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>⚠️</Text>

        <Text style={styles.errorTitle}>
          Failed to load data
        </Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchProducts}
        >
          <Text style={styles.retryText}>
            Try Again
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.logo}>
        🛒
      </Text>

      <Text style={styles.title}>
        ShopVerse
      </Text>

      <Text style={styles.subtitle}>
        Discover Amazing Products
      </Text>

      <SearchBar
        value={search}
        onChangeText={handleSearch}
      />

      {filteredProducts.length === 0 ? (
        <View style={styles.center}>

          <Text style={styles.emptyEmoji}>
            🔍
          </Text>

          <Text style={styles.emptyTitle}>
            No Product Found
          </Text>

          <Text style={styles.emptyText}>
            Try another keyword
          </Text>

        </View>
      ) : (

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={openDetail}
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />

      )}

      <DetailModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={closeDetail}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F7FC",
    paddingTop: 50,
  },

  logo: {
    fontSize: 45,
    textAlign: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "center",
    marginTop: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  loading: {
    marginTop: 15,
    fontSize: 16,
    color: "#666",
  },

  errorEmoji: {
    fontSize: 60,
  },

  errorTitle: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "bold",
    color: "#EF4444",
  },

  retryButton: {
    marginTop: 25,
    backgroundColor: "#2563EB",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 15,
  },

  retryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  emptyEmoji: {
    fontSize: 60,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E3A8A",
  },

  emptyText: {
    marginTop: 8,
    color: "#666",
    fontSize: 16,
  },
});