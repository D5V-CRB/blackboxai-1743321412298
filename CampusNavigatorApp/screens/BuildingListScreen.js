import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, Text, TouchableOpacity } from 'react-native';
import { buildings } from '../src/buildings';

export default function BuildingListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBuildings, setFilteredBuildings] = useState(buildings);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = buildings.filter(building => 
        building.name.toLowerCase().includes(query.toLowerCase()) ||
        building.code.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBuildings(filtered);
    } else {
      setFilteredBuildings(buildings);
    }
  };

  const renderBuildingItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.buildingItem}
      onPress={() => navigation.navigate('BuildingDetails', { building: item })}
    >
      <View style={styles.buildingInitial}>
        <Text style={styles.initialText}>{item.code}</Text>
      </View>
      <Text style={styles.buildingName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search buildings..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredBuildings}
        renderItem={renderBuildingItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  buildingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buildingInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0d6efd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  initialText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buildingName: {
    fontSize: 16,
    color: '#333',
  },
});