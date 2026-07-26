import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties?limit=5');
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  const renderPropertyCard = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.images?.[0] || 'https://via.placeholder.com/300x200' }} />
      <Card.Content style={styles.cardContent}>
        <Text variant="headlineSmall" style={styles.title}>
          {item.title}
        </Text>
        <Text variant="labelMedium" style={styles.location}>
          {item.location?.city}, {item.location?.state}
        </Text>
        <Text variant="headlineMedium" style={styles.price}>
          ${item.price.toLocaleString()}
        </Text>
        <Text variant="bodySmall">
          {item.bedrooms} Bed • {item.bathrooms} Bath • {item.area} sqft
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('PropertyDetail', { propertyId: item._id })}
        >
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.headerText}>
          🏠 Find Your Home
        </Text>
        <Text variant="bodyMedium">Browse properties near you</Text>
      </View>

      <FlatList
        data={properties}
        renderItem={renderPropertyCard}
        keyExtractor={(item) => item._id}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    margin: 12,
    backgroundColor: 'white',
  },
  cardContent: {
    paddingVertical: 12,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    color: '#666',
    marginBottom: 8,
  },
  price: {
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default HomeScreen;
