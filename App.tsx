import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import StartWorkoutScreen from './StartWorkoutScreen';
import CreateWorkoutScreen from './CreateWorkoutScreen';
import ViewProgressScreen from './ViewProgressScreen';
import SettingsScreen from './SettingsScreen';
import { DarkModeProvider } from './DarkModeContext';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="StartWorkout" component={StartWorkoutScreen} />
          <Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
          <Stack.Screen name="ViewProgress" component={ViewProgressScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DarkModeProvider>
  );
};

export default App;
