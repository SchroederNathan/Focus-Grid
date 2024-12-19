import { generateRandomDays } from "@/helpers/CardHelpers";
import { Habit } from "@/models/models";
import { useHabitsStore } from "@/zustand/store";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import PrimaryButton from "./components/PrimaryButton";

const settings = () => {
  const { habits, setHabitDays } = useHabitsStore();

  const generateRandomEntries = () => {
    habits.forEach((habit: Habit) => {
      const randomDays = generateRandomDays();
      setHabitDays(habit.id, randomDays);
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background overflow-visible relative">
      <Header name="Settings" handleBackPress={() => router.back()} />

      <View className="flex-1 bg-background px-4 py-2 z-50">
        <PrimaryButton
          title="Generate Random Entries"
          color={"bg-primary"}
          onPress={generateRandomEntries}
        />
      </View>
    </SafeAreaView>
  );
};

export default settings;
