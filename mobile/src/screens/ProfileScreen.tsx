import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button, TextInput } from 'react-native-paper';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = 'user-token'; // Get from storage
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setFormData(response.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, formData);
      setUser(formData);
      setEditing(false);
      alert('Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            👤 My Profile
          </Text>

          <TextInput
            label="Full Name"
            value={formData.fullName || ''}
            onChangeText={(text) =>
              setFormData({ ...formData, fullName: text })
            }
            editable={editing}
            style={styles.input}
          />

          <TextInput
            label="Email"
            value={formData.email || ''}
            editable={false}
            style={styles.input}
          />

          <TextInput
            label="Phone"
            value={formData.phone || ''}
            onChangeText={(text) =>
              setFormData({ ...formData, phone: text })
            }
            editable={editing}
            style={styles.input}
          />

          <Text variant="labelMedium" style={styles.label}>
            User Type: {user.userType}
          </Text>

          <View style={styles.buttonContainer}>
            {editing ? (
              <>
                <Button
                  mode="contained"
                  onPress={handleSave}
                  style={styles.button}
                >
                  Save Changes
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => setEditing(false)}
                  style={styles.button}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                mode="contained"
                onPress={() => setEditing(true)}
                style={styles.button}
              >
                Edit Profile
              </Button>
            )}
          </View>

          <Button mode="text" onPress={() => alert('Logging out...')}>
            Logout
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    marginVertical: 12,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  label: {
    marginVertical: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginVertical: 16,
    gap: 8,
  },
  button: {
    paddingVertical: 6,
  },
});

export default ProfileScreen;
