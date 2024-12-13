import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import HabitCard from "./components/HabitCard";
import PrimaryButton from "./components/PrimaryButton";
import { StatusBar } from "expo-status-bar";

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
        ItemSeparatorComponent={() => <View className="mt-5" />}
        renderItem={({ item, index }) => (
          <HabitCard
            id={index}
            name={item.name}
            days={[
              { date: "2024-12-01" },
              { date: "2024-12-02" },
              { date: "2024-12-03" },
              { date: "2024-12-04" },
              { date: "2024-12-05" },
              { date: "2024-12-06" },
              { date: "2024-12-12" },
            ]}
          />
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
