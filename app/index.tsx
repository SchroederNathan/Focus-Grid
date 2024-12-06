import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import HabitCard from "./components/HabitCard";
import PrimaryButton from "./components/PrimaryButton";

const habits = [
  { id: "1", name: "Drink Water" },
  { id: "2", name: "Exercise" },
  { id: "3", name: "Meditate" },
];

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 px-4 py-2 bg-background">
      {/* Habit List */}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="mt-3" />}
        renderItem={({ item, index }) => (
          <HabitCard id={index} name={item.name} />
        )}
      />
      <PrimaryButton
        title="Add Habit"
        onPress={() => router.push("/habits/add")}
      />
    </View>
  );
}
