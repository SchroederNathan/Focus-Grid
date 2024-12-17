import { useHabitsStore } from "@/zustand/store";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HabitCard from "./components/HabitCard";
import Header from "./components/Header";

export default function Home() {
  const router = useRouter();

  const habits = useHabitsStore((state: any) => state.habits);
  const addHabitEntry = useHabitsStore((state: any) => state.addHabitEntry);

  // Function to add today's date to a habit
  const habitEntry = (id: string, date: string) => {
    addHabitEntry(id, date);
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <SafeAreaView className="flex-1 bg-background overflow-hidden relative">
      <Header
        name="Habit Tracker"
        handleRightIconPress={() => handleSettings()}
      />

      <View className="flex-1 px-4 py-2 bg-background overflow-hidden -mb-12 pb-36">
        {/* Habit List */}
        <FlatList
          data={habits}
          keyExtractor={(item) => item.name}
          className="rounded-t-lg pb-24 overflow-visible"
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item, index }) => (
            <>
              <HabitCard
                id={item.id}
                name={item.name}
                description={item.description}
                days={item.days}
                icon={item.icon}
                habitEntry={habitEntry}
              />
              {item.icon}
            </>
          )}
        />
        <StatusBar style="dark" />
      </View>
    </SafeAreaView>
  );
}
