import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Button, Alert } from 'react-native';
import { useWorkoutContext } from './WorkoutContext';
import { useExerciseContext } from './ExerciseContext'; // Import the exercise context

interface Exercise {
    id: string;
    name: string;
    muscle: string;
    sets: number;
    reps: number;
    pr: number;
  }

  const CreateWorkoutScreen: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newExerciseName, setNewExerciseName] = useState('');
    const [newExerciseMuscle, setNewExerciseMuscle] = useState('');
    const [isAddingNewExercise, setIsAddingNewExercise] = useState(false);
    const [workoutNameModalVisible, setWorkoutNameModalVisible] = useState(false);
    const [workoutName, setWorkoutName] = useState('');
    const { savedWorkouts, addWorkout } = useWorkoutContext();
    const [selectedExercises, setSelectedExercisesState] = useState<Exercise[]>([]);
    const { exercises, addExercise } = useExerciseContext(); // Access the exercise context
  
  // Sample set of initial exercises
  const initialExercises: Exercise[] = [
    { id: '1', name: 'Push-up', muscle: 'Chest', sets: 0, reps: 0, pr: 0 },
    { id: '2', name: 'Pull-up', muscle: 'Back', sets: 0, reps: 0, pr: 0 },
    { id: '3', name: 'Squat', muscle: 'Legs', sets: 0, reps: 0, pr: 0 },
    // Add more sample exercises as needed
  ];

 // Function to add a new exercise
 const handleAddNewExercise = () => {
    toggleAddNewExerciseModal(); // Open the modal for adding a new exercise
  };

  const handleSelectExercise = (exerciseId: string) => {
    setModalVisible(false);
    const selectedExercise = exercises.find((item) => item.id === exerciseId); // Find exercise in context
    if (selectedExercise) {
      setSelectedExercisesState([...selectedExercises, { ...selectedExercise, sets: 0, reps: 0, pr: 0 }]);
    }
  };

  // Function to toggle the visibility of the modal for adding a new exercise
  const toggleAddNewExerciseModal = () => {
    setIsAddingNewExercise(!isAddingNewExercise); // Toggle the state to show/hide the modal
    setModalVisible(!modalVisible); // Also close the exercise selection modal if it's open
  };
   // Function to save a new exercise
   const handleSaveNewExercise = () => {
    if (newExerciseName.trim() !== '' && newExerciseMuscle.trim() !== '') {
      const newExercise = {
        id: String(new Date().getTime()), // Generate unique ID
        name: newExerciseName,
        muscle: newExerciseMuscle,
        sets: 0,
        reps: 0,
        pr: 0
      };
      addExercise(newExercise); // Add new exercise to context
      setSelectedExercisesState([...selectedExercises, newExercise]);
      setNewExerciseName('');
      setNewExerciseMuscle('');
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
    const workout = {
      id: String(new Date().getTime()), // Generate unique ID
      name: workoutName,
      exercises: selectedExercises,
    };
    addWorkout(workout);
    Alert.alert('Workout saved successfully!');
    setWorkoutName('');
    setWorkoutNameModalVisible(false);
    setSelectedExercisesState([]); // Reset selected exercises after saving
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity onPress={() => handleSelectExercise(item.id)}>
      <View style={styles.exerciseItem}>
        <Text>{item.name}</Text>
        <Text>{item.muscle}</Text>
        <Text>PR: {item.pr}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderSelectedExerciseItem = ({ item }: { item: Exercise }) => (
    <View style={styles.selectedExerciseItem}>
      <Text>{item.name}</Text>
      <Text>{item.muscle}</Text>
    </View>
  );
   

  const renderSavedWorkouts = () => {
    return savedWorkouts.map((workout) => (
      <Button key={workout.id} title={workout.name} onPress={() => setSelectedExercisesState(workout.exercises)} />
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Workout Screen</Text>
      <Button title="Add Exercise" onPress={() => setModalVisible(true)} />
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
  <View style={styles.modalContainer}>
    <Text style={styles.text}>Select Exercise</Text>
    {!isAddingNewExercise ? (
        <>
        <FlatList
  data={exercises}
  renderItem={renderExerciseItem}
  keyExtractor={(item: Exercise) => item.id}
/>


        <Button title="Add New Exercise" onPress={() => setIsAddingNewExercise(true)} />
        <Button title="Cancel" onPress={() => setModalVisible(false)} />
      </>
    ) : (
      <>
        <Text style={styles.text}>New Exercise</Text>
        <TextInput
          style={styles.input}
          value={newExerciseName}
          onChangeText={setNewExerciseName}
          placeholder="Exercise Name"
        />
        <TextInput
          style={styles.input}
          value={newExerciseMuscle}
          onChangeText={setNewExerciseMuscle}
          placeholder="Muscle Group"
        />
        <Button title="Save Exercise" onPress={handleSaveNewExercise} />
        <Button title="Cancel" onPress={() => setIsAddingNewExercise(false)} />
      </>
    )}
  </View>
</Modal>

      <View style={styles.selectedExercisesContainer}>
        <Text>Selected Exercises:</Text>
        {selectedExercises.length > 0 ? (
          <FlatList
            data={selectedExercises}
            renderItem={renderSelectedExerciseItem}
            keyExtractor={(item: Exercise) => item.id}
          />
        ) : (
          <Text>No exercises selected</Text>
        )}
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
      <View style={styles.savedWorkoutsContainer}>
        <Text>Saved Workouts:</Text>
        {renderSavedWorkouts()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
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
    width: '100%',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  savedWorkoutsContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default CreateWorkoutScreen;
