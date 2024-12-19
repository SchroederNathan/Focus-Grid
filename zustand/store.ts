import { Habit, HabitDay } from "@/models/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// Define the store interface
interface HabitState {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  removeHabit: (id: string) => void;
  updateHabit: (id: string, updatedHabit: Habit) => void;
  addHabitEntry: (id: string, day: string) => void;
  removeDateFromHabit: (id: string, date: string) => void;
  setHabitDays: (id: string, days: HabitDay[]) => void;
}

export const useHabitsStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      // Add a new habit
      addHabit: (habit: Habit) =>
        set((state: any) => ({
          habits: [...state.habits, { ...habit, days: [] }],
        })),
      // Remove a habit by its id
      removeHabit: (id: string) =>
        set((state: any) => ({
          habits: state.habits.filter((habit: Habit) => habit.id !== id),
        })),

      // Update an existing habit
      updateHabit: (id: string, updatedHabit: Habit) =>
        set((state: any) => ({
          habits: state.habits.map((habit: Habit) =>
            habit.id === id ? { ...habit, ...updatedHabit } : habit
          ),
        })),
        addHabitEntry: (id: string, day: string) =>
          set((state: any) => ({
            habits: state.habits.map((habit: Habit) =>
              habit.id === id 
                ? { 
                    ...habit, 
                    days: [...(habit.days ?? []), { date: day }] // Changed || to ?? for null coalescing
                  } 
                : habit
            ),
          })),
      removeDateFromHabit: (id: string, date: string) =>
        set((state: any) => ({
          habits: state.habits.map((habit: Habit) =>
            habit.id === id
              ? {
                  ...habit,
                  days: (habit.days || []).filter((day) => day.date !== date),
                }
              : habit
          ),
        })),
      setHabitDays: (id: string, days: HabitDay[]) =>
        set((state: any) => ({
          habits: state.habits.map((habit: Habit) =>
            habit.id === id ? { ...habit, days } : habit
          ),
        })),
    }),
    {
      name: "habits-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
