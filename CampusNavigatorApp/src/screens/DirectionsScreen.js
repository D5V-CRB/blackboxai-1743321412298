import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { campusNodes } from './gsfc_campus_data';
import GSFCNavigator from './gsfc_astar';

const DirectionsScreen = () => {
  const [startId, setStartId] = useState(null);
  const [endId, setEndId] = useState(null);
  const [path, setPath] = useState([]);

  const calculateRoute = () => {
    const navigator = new GSFCNavigator(campusNodes, campusEdges);
    const newPath = navigator.findPath(startId, endId);
    setPath(newPath || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculate Route</Text>
      <View style={styles.buttonContainer}>
        {campusNodes.map(node => (
          <Button
            key={node.id}
            title={`From ${node.name}`}
            onPress={() => setStartId(node.id)}
          />
        ))}
        {campusNodes.map(node => (
          <Button
            key={node.id}
            title={`To ${node.name}`}
            onPress={() => setEndId(node.id)}
          />
        ))}
      </View>
      <Button title="Calculate" onPress={calculateRoute} />
      {path.length > 0 && (
        <Text style={styles.result}>Path found: {path.join(' -> ')}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: '#2E86C1',
  },
});

export default DirectionsScreen;