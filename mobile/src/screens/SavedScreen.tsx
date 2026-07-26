import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import axios from 'axios';

const SavedScreen = ({ navigation }) => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const fetchSavedProperties = async () => {
    try {
      const userId = 'user-id'; // Get from storage/context
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      // Fetch full property details
      const propertyDetails = await Promise.all(
        response.data.savedProperties.map((propId) =>
          axios.get(`http://localhost:5000/api/properties/${propId}`)
        )
      );
      setSavedProperties(propertyDetails.map((res) => res.data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saved properties:', error);
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
        <Text variant="headlineMedium" style={styles.price}>
          ${item.price.toLocaleString()}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('PropertyDetail', { propertyId: item._id })}
        >
          View
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.headerText}>
          ❤️ Saved Properties
        </Text>
      </View>

      {savedProperties.length > 0 ? (
        <FlatList
          data={savedProperties}
          renderItem={renderPropertyCard}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text variant="headlineMedium">No saved properties yet</Text>
          <Text variant="bodyMedium" style={styles.emptyText}>
            Start exploring and save your favorite properties!
          </Text>
        </View>
      )}
    </View>
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
    marginBottom: 8,
  },
  price: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 12,
    color: '#666',
  },
});

export default SavedScreen;
