import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Button, Alert } from 'react-native';

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
  const [selectedExercises, setSelectedExercises] = useState<{ id: string; name: string; muscle: string; sets: string; reps: string }[]>([]);
  const [isAddingNewExercise, setIsAddingNewExercise] = useState(false);
  const [workoutNameModalVisible, setWorkoutNameModalVisible] = useState(false);
  const [workoutName, setWorkoutName] = useState('');

  const handleSelectExercise = (exerciseId: string) => {
    setModalVisible(false); // Close the modal after selecting an exercise
    const selectedExercise = exercisesData.find((item) => item.id === exerciseId);
    if (selectedExercise) {
      setSelectedExercises([...selectedExercises, { id: exerciseId, name: selectedExercise.name, muscle: selectedExercise.muscle, sets: '', reps: '' }]);
    }
  };

  const handleAddNewExercise = () => {
    setIsAddingNewExercise(true);
  };

  const handleSaveNewExercise = () => {
    if (newExerciseName.trim() !== '' && newExerciseMuscle.trim() !== '') {
      // Add the new exercise to the selected exercises list
      setSelectedExercises([
        ...selectedExercises,
        { id: String(nextId++), name: newExerciseName, muscle: newExerciseMuscle, sets: '', reps: '' }
      ]);
      // Reset the new exercise name and muscle fields
      setNewExerciseName('');
      setNewExerciseMuscle('');
      // Close the modal
      setIsAddingNewExercise(false);
      setModalVisible(false);
    } else {
      Alert.alert('Please enter both exercise name and muscle.');
    }
  };

  const handleSaveWorkout = () => {
    if (selectedExercises.length === 0) {
      Alert.alert('Please add exercises to the workout.');
      return;
    }
    setWorkoutNameModalVisible(true);
  };

  const handleConfirmSaveWorkout = () => {
    if (workoutName.trim() === '') {
      Alert.alert('Workout name is required.');
      return;
    }
    // Here you can save the workout with the entered name and the selected exercises
    // Reset the workout name and close the modal
    Alert.alert('Workout saved successfully!');
    setWorkoutName('');
    setWorkoutNameModalVisible(false);
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
          <Text>{exercise.name}</Text>
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
          {isAddingNewExercise ? (
            <>
              <Text>New Exercise Name:</Text>
              <TextInput
                style={styles.input}
                value={newExerciseName}
                onChangeText={setNewExerciseName}
                placeholder="Enter exercise name"
              />
              <Text>New Exercise Muscle:</Text>
              <TextInput
                style={styles.input}
                value={newExerciseMuscle}
                onChangeText={setNewExerciseMuscle}
                placeholder="Enter muscle"
              />
              <Button title="Save Exercise" onPress={handleSaveNewExercise} />
            </>
          ) : (
            <>
              <Text>Select Exercise:</Text>
              <FlatList
                data={exercisesData}
                renderItem={renderExerciseItem}
                keyExtractor={(item) => item.id}
              />
              <Button title="Add New Exercise" onPress={handleAddNewExercise} />
            </>
          )}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <View style={styles.selectedExercisesContainer}>
        <Text>Selected Exercises:</Text>
        {renderSelectedExercises()}
      </View>
      <Button title="Save Workout" onPress={handleSaveWorkout} />
      <Modal animationType="slide" visible={workoutNameModalVisible} onRequestClose={() => setWorkoutNameModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text>Enter Workout Name:</Text>
          <TextInput
            style={styles.input}
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Enter workout name"
          />
          <Button title="Confirm" onPress={handleConfirmSaveWorkout} />
          <Button title="Cancel" onPress={() => setWorkoutNameModalVisible(false)} />
        </View>
      </Modal>
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
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default CreateWorkoutScreen;
