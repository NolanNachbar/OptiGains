import React from 'react';
import { View, Button, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the Home Screen</Text>
      <Button title="Start Workout" onPress={() => navigation.navigate('StartWorkout')} />
      <Button title="Create Workout" onPress={() => navigation.navigate('CreateWorkout')} />
      <Button title="View Progress" onPress={() => navigation.navigate('ViewProgress')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

export default HomeScreen;
