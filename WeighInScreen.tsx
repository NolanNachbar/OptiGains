import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useWeighInContext } from './WeighInContext';

const WeighInScreen: React.FC = () => {
  const { weighIns, addWeighIn, deleteWeighIn } = useWeighInContext();
  const [weight, setWeight] = useState('');

  const handleAddWeighIn = () => {
    if (weight) {
      addWeighIn(parseFloat(weight));
      setWeight('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weigh-In Records</Text>
      <FlatList
        data={weighIns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Text>{item.date}</Text>
            <Text>{item.weight} Lbs</Text>
            <Button title="Delete" onPress={() => deleteWeighIn(item.id)} />
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (Lbs)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <Button title="Add Weigh-In" onPress={handleAddWeighIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  record: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default WeighInScreen;
