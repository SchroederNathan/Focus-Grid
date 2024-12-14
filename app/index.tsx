import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import HabitCard from "./components/HabitCard";
import PrimaryButton from "./components/PrimaryButton";
import { generateRandomDays } from "./helpers/CardHelpers";
import { Habit } from "./models";
import * as Haptics from "expo-haptics";

export default function Home() {
  const router = useRouter();
  const randomDayArray = [];
  for (let i = 0; i < 4; i++) {
    randomDayArray.push(generateRandomDays());
  }

  const [habits, setHabits] = useState<Habit[]>([
    {
      name: "Drink Water",
      description: "Water is essential for life",
      days: randomDayArray[0],
    },
    {
      name: "Exercise",
      days: randomDayArray[1],
    },
    {
      name: "Meditate",
      description: "Meditation is good for your mental health",
      days: randomDayArray[2],
    },
    {
      name: "Read a Book",
      description: "Reading is good for your brain",
      days: randomDayArray[3],
    },
  ]);

  // Function to add today's date to a habit
  const habitEntry = (id: number) => {
    const today = new Date();
    const date = today.toISOString().split("T")[0];

    setHabits((prevHabits) => {
      const updatedHabits = [...prevHabits];
      updatedHabits[id].days.push({ date });
      return updatedHabits;
    });
  };

  return (
    <>
      <View className="h-16 flex justify-center items-center bg-background">
        <Text className="text-xl font-lsemibold text-text">Habit Tracker</Text>
      </View>

      <View className="flex-1 px-4 py-2 bg-background overflow-visible">
        {/* Habit List */}
        <FlatList
          data={habits}
          keyExtractor={(item) => item.name}
          ItemSeparatorComponent={() => <View className="mt-5" />}
          className="rounded-t-lg pb-24"
          renderItem={({ item, index }) => (
            <HabitCard
              id={index}
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
        />
        <StatusBar style="dark" />
      </View>
    </>
  );
}
