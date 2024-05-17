import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ViewProgressScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>View Progress Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default ViewProgressScreen;
