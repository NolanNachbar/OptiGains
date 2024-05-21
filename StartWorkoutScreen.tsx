import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { useWorkoutContext } from './WorkoutContext';
import { usePastWorkoutContext } from './PastWorkoutsContext';

interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
  pr: number;
}

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}

const StartWorkoutScreen: React.FC = () => {
  const { savedWorkouts } = useWorkoutContext();
  const { addPastWorkout } = usePastWorkoutContext();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const handleSelectWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const handleSavePastWorkout = () => {
    if (selectedWorkout) {
      addPastWorkout(selectedWorkout);
      Alert.alert('Workout saved to history!');
      setSelectedWorkout(null);
    }
  };

  const updateExercise = (exerciseId: string, sets: number, reps: number) => {
    if (!selectedWorkout) return;

    const updatedExercises = selectedWorkout.exercises.map(exercise =>
      exercise.id === exerciseId ? { ...exercise, sets, reps } : exercise
    );

    setSelectedWorkout({ ...selectedWorkout, exercises: updatedExercises });
  };

  const renderWorkoutItem = ({ item }: { item: Workout }) => (
    <TouchableOpacity onPress={() => handleSelectWorkout(item)}>
      <View style={styles.workoutItem}>
        <Text style={styles.workoutName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <View style={styles.exerciseItem}>
      <Text>{item.name} - {item.muscle}</Text>
      <Text>PR: {item.pr}</Text>
      <Text>
        Sets
      </Text>
      <TextInput
        style={styles.input}
        value={item.sets.toString()}
        onChangeText={text => updateExercise(item.id, parseInt(text) || 0, item.reps)}
        keyboardType="numeric"
        placeholder="Sets"
      />
      <Text>
        Reps
      </Text>
      <TextInput

        style={styles.input}
        value={item.reps.toString()}
        onChangeText={text => updateExercise(item.id, item.sets, parseInt(text) || 0)}
        keyboardType="numeric"
        placeholder="Reps"
      />
      <Text>
        Weight
      </Text>
      <TextInput
        style={styles.input}
        value={item.reps.toString()}
        onChangeText={text => updateExercise(item.id, item.sets, parseInt(text) || 0)}
        keyboardType="numeric"
        placeholder="Weight"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Start Workout Screen</Text>
      {selectedWorkout ? (
        <>
          <Text style={styles.selectedWorkoutName}>{selectedWorkout.name}</Text>
          <FlatList
            data={selectedWorkout.exercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item) => item.id}
          />
          <Button title="Save Workout to History" onPress={handleSavePastWorkout} />
          <Button title="Back to Workouts" onPress={() => setSelectedWorkout(null)} />
        </>
      ) : (
        <FlatList
          data={savedWorkouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.id}
        />
      )}
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
  workoutItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  workoutName: {
    fontSize: 18,
  },
  selectedWorkoutName: {
    fontSize: 20,
    marginBottom: 16,
  },
  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  input: {
    width: 50,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});

export default StartWorkoutScreen;
