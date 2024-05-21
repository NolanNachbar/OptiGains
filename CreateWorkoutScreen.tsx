import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';

// Sample data for exercises
const exercisesData = [
  { id: '1', name: 'Squats', muscle: 'Quadriceps', pr: 100 },
  { id: '2', name: 'Push-ups', muscle: 'Chest', pr: 50 },
  // Add more exercises as needed
];

const CreateWorkoutScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const handleSelectExercise = (exerciseId: string) => {
    setSelectedExercises([...selectedExercises, exerciseId]);
  };

  const renderExerciseItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleSelectExercise(item.id)}>
      <View style={styles.exerciseItem}>
        <Text>{item.name}</Text>
        <Text>{item.muscle}</Text>
        <Text>PR: {item.pr}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSelectedExercises = () => {
    return selectedExercises.map((exerciseId) => {
      const exercise = exercisesData.find((item) => item.id === exerciseId);
      return (
        <View key={exerciseId} style={styles.selectedExerciseItem}>
          <Text>{exercise?.name}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Workout Screen</Text>
      <Button title="Add Exercise" onPress={() => setModalVisible(true)} />
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text>Select Exercise:</Text>
          <FlatList
            data={exercisesData}
            renderItem={renderExerciseItem}
            keyExtractor={(item) => item.id}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <View style={styles.selectedExercisesContainer}>
        <Text>Selected Exercises:</Text>
        {renderSelectedExercises()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedExerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  selectedExercisesContainer: {
    marginTop: 20,
  },
});

export default CreateWorkoutScreen;
