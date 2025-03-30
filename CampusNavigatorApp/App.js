import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import BuildingListScreen from './screens/BuildingListScreen';
import BuildingDetailScreen from './screens/BuildingDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'GSFC Campus Navigator' }} 
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ title: 'Campus Map' }} 
        />
        <Stack.Screen 
          name="Buildings" 
          component={BuildingListScreen} 
          options={{ title: 'Building Directory' }} 
        />
        <Stack.Screen 
          name="BuildingDetails" 
          component={BuildingDetailScreen} 
          options={{ title: 'Building Information' }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});