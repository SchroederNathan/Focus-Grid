import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, View } from "react-native";
import HabitCard from "./components/HabitCard";
import PrimaryButton from "./components/PrimaryButton";
import { generateRandomDays } from "./helpers/CardHelpers";

export default function Home() {
  const router = useRouter();

  const habits = [
    { id: "1", name: "Drink Water", days: generateRandomDays() },
    { id: "2", name: "Exercise", days: generateRandomDays() },
    { id: "3", name: "Meditate", days: generateRandomDays() },
    { id: "4", name: "Read a Book", days: generateRandomDays() },
  ];
  
  return (
    <View className="flex-1 px-4 py-2 bg-background overflow-visible">
      {/* Habit List */}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="mt-5" />}
        className="rounded-t-lg pb-24"
        renderItem={({ item, index }) => (
          <HabitCard id={index} name={item.name} days={habits[index].days} />
        )}
      />
      <PrimaryButton
        title="Add Habit"
        onPress={() => router.push("/habits/add")}
      />
      <StatusBar style="dark" />
    </View>
  );
}
