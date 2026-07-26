import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Card, Text, Button, Rating } from 'react-native-paper';
import axios from 'axios';

const PropertyDetailScreen = ({ route, navigation }) => {
  const { propertyId } = route.params;
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPropertyDetails();
    fetchReviews();
  }, [propertyId]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/properties/${propertyId}`
      );
      setProperty(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching property:', error);
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reviews/property/${propertyId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  if (loading || !property) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image */}
      <Image
        source={{
          uri: property.images?.[0] || 'https://via.placeholder.com/400x300',
        }}
        style={styles.image}
      />

      {/* Details */}
      <Card style={styles.detailCard}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            {property.title}
          </Text>
          <Text variant="labelMedium" style={styles.location}>
            📍 {property.location?.address}
          </Text>
          <Text variant="displaySmall" style={styles.price}>
            ${property.price.toLocaleString()}
          </Text>

          <View style={styles.features}>
            <Text variant="bodyMedium">
              🛏️ {property.bedrooms} Bedrooms
            </Text>
            <Text variant="bodyMedium">
              🚿 {property.bathrooms} Bathrooms
            </Text>
            <Text variant="bodyMedium">
              📐 {property.area} sqft
            </Text>
            <Text variant="bodyMedium">
              🏷️ {property.propertyType}
            </Text>
          </View>

          <Text variant="bodyMedium" style={styles.description}>
            {property.description}
          </Text>

          <Button
            mode="contained"
            style={styles.contactButton}
            onPress={() => alert('Contact feature coming soon!')}
          >
            Contact Owner
          </Button>
        </Card.Content>
      </Card>

      {/* Reviews */}
      {reviews.length > 0 && (
        <Card style={styles.reviewCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.reviewTitle}>
              ⭐ Reviews
            </Text>
            {reviews.map((review) => (
              <View key={review._id} style={styles.reviewItem}>
                <Text variant="labelMedium" style={styles.reviewAuthor}>
                  {review.user.fullName}
                </Text>
                <Rating value={review.rating} readonly />
                <Text variant="bodySmall">{review.comment}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  detailCard: {
    margin: 12,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    color: '#666',
    marginBottom: 8,
  },
  price: {
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  features: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  description: {
    marginVertical: 16,
    lineHeight: 22,
  },
  contactButton: {
    marginTop: 12,
    paddingVertical: 8,
  },
  reviewCard: {
    margin: 12,
    backgroundColor: 'white',
  },
  reviewTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  reviewItem: {
    marginVertical: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewAuthor: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default PropertyDetailScreen;
