import { useHabitsStore } from "@/zustand/store";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Text, View } from "react-native";
import HabitCard from "./components/HabitCard";
import PrimaryButton from "./components/PrimaryButton";
import Header from "./components/Header";

export default function Home() {
  const router = useRouter();

  const habits = useHabitsStore((state: any) => state.habits);
  const addHabitEntry = useHabitsStore((state: any) => state.addHabitEntry);

  console.log(habits);

  // Function to add today's date to a habit
  const habitEntry = (id: string, date: string) => {
    addHabitEntry(id, date);
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <>
      <Header
        name="Habit Tracker"
        handleRightIconPress={() => handleSettings()}
      />

      <View className="flex-1 px-4 py-2 bg-background overflow-visible">
        {/* Habit List */}
        <FlatList
          data={habits}
          keyExtractor={(item) => item.name}
          className="rounded-t-lg pb-24 overflow-visible"
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item, index }) => (
            <HabitCard
              id={item.id}
              name={item.name}
              description={item.description}
              days={item.days}
              habitEntry={habitEntry}
            />
          )}
        />
        <PrimaryButton
          title="Add Habit"
          onPress={() => {
            router.push("/habits/add");
            Haptics.selectionAsync();
          }}
          color="bg-text"
        />
        <StatusBar style="dark" />
      </View>
    </>
  );
}
