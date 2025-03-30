import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BuildingDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { building } = route.params || {};

  // Default building data if none passed
  const buildingData = building || {
    id: '1',
    name: 'Main Administration Building',
    code: 'MAB',
    description: 'Primary administrative offices and services',
    facilities: ['Admissions', 'Registrar', 'Financial Aid'],
    image: require('../assets/placeholder-building.jpg')
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.buildingInitial}>
          <Text style={styles.initialText}>{buildingData.code}</Text>
        </View>
        <Text style={styles.buildingName}>{buildingData.name}</Text>
      </View>

      <Image
        source={buildingData.image}
        style={styles.buildingImage}
        resizeMode="cover"
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.sectionContent}>{buildingData.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Facilities</Text>
        {buildingData.facilities.map((facility, index) => (
          <Text key={index} style={styles.departmentItem}>• {facility}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 16,
  },
  backButtonText: {
    color: '#0d6efd',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buildingInitial: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0d6efd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  initialText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buildingName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buildingImage: {
    width: '100%',
    height: 200,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  departmentItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
});