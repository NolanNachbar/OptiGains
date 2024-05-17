import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View, Button, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList } from './types';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? Colors.black : Colors.white },
        ]}
      >
        <Text style={styles.title}>Main Menu</Text>
        <Button title="Start Workout" onPress={() => navigation.navigate('StartWorkout')} />
        <Button title="View Progress" onPress={() => navigation.navigate('ViewProgress')} />
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
