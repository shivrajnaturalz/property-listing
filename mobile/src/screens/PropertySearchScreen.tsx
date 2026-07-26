import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, Card, Text, Button, Chip } from 'react-native-paper';
import axios from 'axios';

const PropertySearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ city: '', minPrice: '', maxPrice: '' });
  const [propertyType, setPropertyType] = useState('');

  useEffect(() => {
    searchProperties();
  }, [filters, propertyType]);

  const searchProperties = async () => {
    try {
      const query = new URLSearchParams();
      if (filters.city) query.append('city', filters.city);
      if (filters.minPrice) query.append('minPrice', filters.minPrice);
      if (filters.maxPrice) query.append('maxPrice', filters.maxPrice);
      if (propertyType) query.append('propertyType', propertyType);

      const response = await axios.get(
        `http://localhost:5000/api/properties?${query}`
      );
      setProperties(response.data);
    } catch (error) {
      console.error('Error searching properties:', error);
    }
  };

  const propertyTypes = ['apartment', 'house', 'villa', 'commercial', 'land'];

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
        <Text variant="bodySmall" style={styles.details}>
          {item.bedrooms}B • {item.bathrooms}Ba • {item.area}sqft
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
        <Searchbar
          placeholder="Search city or address"
          onChangeText={(text) => setFilters({ ...filters, city: text })}
          value={filters.city}
          style={styles.searchbar}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text variant="labelMedium" style={styles.filterLabel}>
          Property Type:
        </Text>
        <View style={styles.chipContainer}>
          {propertyTypes.map((type) => (
            <Chip
              key={type}
              selected={propertyType === type}
              onPress={() => setPropertyType(propertyType === type ? '' : type)}
              style={styles.chip}
            >
              {type}
            </Chip>
          ))}
        </View>
      </View>

      <FlatList
        data={properties}
        renderItem={renderPropertyCard}
        keyExtractor={(item) => item._id}
        scrollEnabled={true}
      />
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
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchbar: {
    backgroundColor: 'white',
  },
  filterContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 8,
  },
  filterLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginVertical: 4,
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
    marginBottom: 8,
  },
  details: {
    color: '#666',
  },
});

export default PropertySearchScreen;
