import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GSFCMapScreen from './GSFCMapScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="GSFCMap" 
          component={GSFCMapScreen}
          options={{
            title: 'GSFC Campus Navigator',
            headerStyle: {
              backgroundColor: '#2E86C1', // GSFC brand blue
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        {/* Additional screens can be added here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;