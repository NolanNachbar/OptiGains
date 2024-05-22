import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { useWorkoutContext } from './WorkoutContext';
import { usePastWorkoutContext } from './PastWorkoutsContext';
import { useNavigation } from '@react-navigation/native';

interface SetDetails {
  weight: number;
  reps: number;
}

interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: SetDetails[];
  pr: number;
  notes: string;
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
  const navigation = useNavigation();

  const handleSelectWorkout = (workout: Workout) => {
    const initializedWorkout = {
      ...workout,
      exercises: workout.exercises.map(exercise => ({
        ...exercise,
        sets: exercise.sets || [{ weight: 0, reps: 0 }],
        notes: exercise.notes || ''
      }))
    };
    setSelectedWorkout(initializedWorkout);
  };

  const handleSavePastWorkout = () => {
    if (selectedWorkout) {
      addPastWorkout(selectedWorkout);
      Alert.alert('Workout saved to history!');
      setSelectedWorkout(null);
    }
  };

  const updateSetDetails = (exerciseId: string, exerciseIndex: number, setIndex: number, field: 'weight' | 'reps', value: number) => {
    if (!selectedWorkout) return;

    const updatedExercises = selectedWorkout.exercises.map((exercise, idx) => {
      if (idx === exerciseIndex) {
        const updatedSets = exercise.sets.map((set, sIndex) =>
          sIndex === setIndex ? { ...set, [field]: value } : set
        );
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });

    setSelectedWorkout({ ...selectedWorkout, exercises: updatedExercises });
  };

  const updateExerciseNotes = (exerciseId: string, notes: string) => {
    if (!selectedWorkout) return;

    const updatedExercises = selectedWorkout.exercises.map(exercise =>
      exercise.id === exerciseId ? { ...exercise, notes } : exercise
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

  const renderExerciseItem = ({ item, index }: { item: Exercise, index: number }) => (
    <View style={styles.exerciseItem}>
      <Text>{item.name} - {item.muscle}</Text>
      <Text>PR: {item.pr}</Text>
      <TextInput
        style={styles.input}
        value={item.sets.length.toString()}
        onChangeText={(text) => updateNumSets(item.id, parseInt(text))}
        keyboardType="numeric"
        placeholder="Number of Sets"
      />
      {item.sets.map((set, setIndex) => renderSetInput(item.id, set, index, setIndex))}
      <Text>Notes:</Text>
      <TextInput
        style={styles.notesInput}
        value={item.notes}
        onChangeText={text => updateExerciseNotes(item.id, text)}
        placeholder="Notes"
      />
    </View>
  );

  const renderSetInput = (exerciseId: string, set: SetDetails, exerciseIndex: number, setIndex: number) => (
    <View key={setIndex} style={styles.setInput}>
      <Text>Set {setIndex + 1}</Text>
      <Text> Weight:</Text>
      <TextInput
        style={styles.input}
        value={set.weight.toString()}
        onChangeText={text => updateSetDetails(exerciseId, exerciseIndex, setIndex, 'weight', parseInt(text) || 0)}
        keyboardType="numeric"
        placeholder="Weight"
      />
      <Text>Reps:</Text>
      <TextInput
        style={styles.input}
        value={set.reps.toString()}
        onChangeText={text => updateSetDetails(exerciseId, exerciseIndex, setIndex, 'reps', parseInt(text) || 0)}
        keyboardType="numeric"
        placeholder="Reps"
      />
    </View>
  );

  const updateNumSets = (exerciseId: string, numSets: number) => {
    if (!selectedWorkout) return;

    const updatedExercises = selectedWorkout.exercises.map(exercise =>
      exercise.id === exerciseId ? { ...exercise, sets: Array.from({ length: numSets }, () => ({ weight: 0, reps: 0 })) } : exercise
    );

    setSelectedWorkout({ ...selectedWorkout, exercises: updatedExercises });
  };

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
        <>
          <FlatList
            data={savedWorkouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>No saved workouts found.</Text>}
          />
          <Button title="Create New Workout" onPress={() => navigation.navigate('CreateWorkout')} />
        </>
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
  setInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  input: {
    width: 60,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  notesInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  emptyContainer: {
    alignItems: 'center',
  },
});

export default StartWorkoutScreen;
