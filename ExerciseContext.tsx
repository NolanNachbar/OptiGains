import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
  pr: number;
}

interface ExerciseContextType {
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExerciseContext must be used within an ExerciseProvider');
  }
  return context;
};

interface ExerciseProviderProps {
  children: ReactNode;
}

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({ children }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise }}>
      {children}
    </ExerciseContext.Provider>
  );
};



export default ExerciseProvider;
