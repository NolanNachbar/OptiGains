// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import StartWorkoutScreen from './StartWorkoutScreen';
import CreateWorkoutScreen from './CreateWorkoutScreen';
import ViewProgressScreen from './ViewProgressScreen';
import SettingsScreen from './SettingsScreen';
import { DarkModeProvider } from './DarkModeContext';
import { PastWorkoutProvider } from './PastWorkoutContext';
import { WeighInProvider } from './WeighInContext';
import { WorkoutProvider } from './WorkoutContext';
import { ExerciseProvider } from './ExerciseContext'; // Import ExerciseProvider

import WeighInScreen from './WeighInScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <PastWorkoutProvider> 
        <WeighInProvider>
          <WorkoutProvider>
            <ExerciseProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="StartWorkout" component={StartWorkoutScreen} />
                  <Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
                  <Stack.Screen name="ViewProgress" component={ViewProgressScreen} />
                  <Stack.Screen name="WeighIn" component={WeighInScreen} />
                  <Stack.Screen name="Settings" component={SettingsScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </ExerciseProvider>
          </WorkoutProvider>
        </WeighInProvider>
      </PastWorkoutProvider>
    </DarkModeProvider>
  );
};

export default App;
