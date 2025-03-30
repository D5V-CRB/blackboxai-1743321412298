import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { campusNodes } from './gsfc_campus_data';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>GSFC University Campus Navigator</Text>
      
      <Text style={styles.subHeader}>Key Locations:</Text>
      {campusNodes.map(node => (
        <View key={node.id} style={styles.locationCard}>
          <Text style={styles.locationName}>{node.name}</Text>
          <Text style={styles.locationDesc}>{node.description}</Text>
        </View>
      ))}

      <Text style={styles.techHeader}>Technology Stack:</Text>
      <Text style={styles.techItem}>- React Native</Text>
      <Text style={styles.techItem}>- A* Pathfinding Algorithm</Text>
      <Text style={styles.techItem}>- GSFC-Optimized Navigation</Text>

      <Text 
        style={styles.link}
        onPress={() => Linking.openURL('https://www.gsfcu.edu.in')}>
        Visit GSFC University Website
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E86C1',
    marginBottom: 20,
    textAlign: 'center'
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#333'
  },
  locationCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E86C1'
  },
  locationDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },
  techHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333'
  },
  techItem: {
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 5,
    color: '#444'
  },
  link: {
    color: '#2E86C1',
    marginTop: 20,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
});

export default AboutScreen;