import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { campusNodes, campusEdges } from './gsfc_campus_data';
import GSFCNavigator from './gsfc_astar';

const GSFCMapScreen = () => {
  const [path, setPath] = useState([]);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  
  // Initialize navigator with GSFC campus data
  const navigator = new GSFCNavigator(campusNodes, campusEdges);

  // Calculate path when selections change
  useEffect(() => {
    if (selectedStart && selectedEnd) {
      const newPath = navigator.findPath(selectedStart, selectedEnd);
      setPath(newPath || []);
    }
  }, [selectedStart, selectedEnd]);

  // Get coordinates for path drawing
  const getPathCoordinates = () => {
    return path.map(nodeId => {
      const node = campusNodes.find(n => n.id === nodeId);
      return {
        latitude: node.coordinates[0],
        longitude: node.coordinates[1]
      };
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 21.1702,
          longitude: 72.8311,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        {campusNodes.map(node => (
          <Marker
            key={node.id}
            coordinate={{
              latitude: node.coordinates[0],
              longitude: node.coordinates[1]
            }}
            title={node.name}
            description={node.description}
            onPress={() => {
              if (!selectedStart) {
                setSelectedStart(node.id);
              } else if (!selectedEnd && node.id !== selectedStart) {
                setSelectedEnd(node.id);
              }
            }}
          />
        ))}
        
        {path.length > 0 && (
          <Polyline
            coordinates={getPathCoordinates()}
            strokeColor="#2E86C1" // GSFC brand blue
            strokeWidth={4}
          />
        )}
      </MapView>

      <View style={styles.controls}>
        <Text style={styles.label}>
          {selectedStart ? 
            `From: ${campusNodes.find(n => n.id === selectedStart).name}` : 
            'Tap a starting point'}
        </Text>
        <Text style={styles.label}>
          {selectedEnd ? 
            `To: ${campusNodes.find(n => n.id === selectedEnd).name}` : 
            'Tap a destination'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default GSFCMapScreen;