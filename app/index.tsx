import { generateRandomDays } from "@/helpers/CardHelpers";
import { Habit } from "@/models/models";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import HabitCard from "./components/HabitCard";
import PrimaryButton from "./components/PrimaryButton";
import { getAllHabits } from "@/services/habitService";

export default function Home() {
  const router = useRouter();

  const [habits, setHabits] = useState<Habit[]>();

  // Fetch all habits from AsyncStorage
  const fetchHabits = async () => {
    const allHabits = await getAllHabits(); // Fetch habits
    setHabits(allHabits); // Update state
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Function to add today's date to a habit
  const habitEntry = (id: number) => {
    const today = new Date();
    const date = today.toISOString().split("T")[0];

    setHabits((prevHabits = []) => {
      const updatedHabits = [...prevHabits];
      updatedHabits[id].days.push({ date });
      return updatedHabits;
    });
  };

  return (
    <>
      <View className="h-16  flex justify-center items-center bg-background">
        <Text className="text-xl font-lsemibold text-text">Habit Tracker</Text>
      </View>

      <View className="flex-1 px-4 py-2 bg-background overflow-visible">
        {/* Habit List */}
        <FlatList
          data={habits}
          keyExtractor={(item) => item.name}
          className="rounded-t-lg pb-24 overflow-visible"
          ItemSeparatorComponent={() => <View className="h-3" />}
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
