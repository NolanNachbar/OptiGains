import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';

// Sample data for exercises
let nextId = 3; // Start with the next id after the existing exercises
const exercisesData = [
  { id: '1', name: 'Squats', muscle: 'Quadriceps', pr: 100 },
  { id: '2', name: 'Push-ups', muscle: 'Chest', pr: 50 },
  // Add more exercises as needed
];

const CreateWorkoutScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseMuscle, setNewExerciseMuscle] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<{ id: string; sets: string; reps: string }[]>([]);

  const handleSelectExercise = (exerciseId: string) => {
    setModalVisible(false); // Close the modal after selecting an exercise
    setSelectedExercises([...selectedExercises, { id: exerciseId, sets: '', reps: '' }]);
  };

  const handleAddNewExercise = () => {
    setSelectedExercises([...selectedExercises, { id: String(nextId++), sets: '', reps: '' }]);
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
    return selectedExercises.map((exercise) => {
      const selectedExercise = exercisesData.find((item) => item.id === exercise.id);
      return (
        <View key={exercise.id} style={styles.selectedExerciseItem}>
          <Text>{selectedExercise?.name}</Text>
          <TextInput
            style={styles.input}
            placeholder="Sets"
            keyboardType="numeric"
            value={exercise.sets}
            onChangeText={(text) => updateSetsReps(exercise.id, text, exercise.reps)}
          />
          <TextInput
            style={styles.input}
            placeholder="Reps"
            keyboardType="numeric"
            value={exercise.reps}
            onChangeText={(text) => updateSetsReps(exercise.id, exercise.sets, text)}
          />
        </View>
      );
    });
  };

  const updateSetsReps = (exerciseId: string, sets: string, reps: string) => {
    setSelectedExercises((prevState) =>
      prevState.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, sets, reps } : exercise
      )
    );
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
          <Button title="Add New Exercise" onPress={handleAddNewExercise} />
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
  input: {
    width: 50,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 5,
  },
});

export default CreateWorkoutScreen;
