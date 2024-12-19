import { useHabitsStore } from "@/zustand/store";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, View } from "react-native";
import { PencilIcon, TrashIcon } from "react-native-heroicons/outline";
import { HoldItem } from "react-native-hold-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import HabitCard from "./components/HabitCard";
import Header from "./components/Header";
import { ShareIcon } from "react-native-heroicons/solid";

export default function Home() {
  const router = useRouter();

  const habits = useHabitsStore((state: any) => state.habits);
  const addHabitEntry = useHabitsStore((state: any) => state.addHabitEntry);
  const removeHabit = useHabitsStore((state: any) => state.removeHabit);

  // Function to add today's date to a habit
  const habitEntry = (id: string, date: string) => {
    addHabitEntry(id, date);
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const renderHabitCard = ({ item }: { item: any }) => (
    <HoldItem
      menuAnchorPosition="top-right"
      theme="light"
      items={[
        {
          text: "Edit",
          icon: () => <PencilIcon size={18} color="#000" />,
          onPress: () => router.push(`/habits/edit/${item.id}`),
        },
        {
          text: "Delete",
          icon: () => <TrashIcon size={18} color="#FF0000" />,
          isDestructive: true,
          onPress: () => removeHabit(item.id),
          withSeparator: true,
        },
        {
          text: "Share",
          icon: () => <ShareIcon size={18} color="#000" />,
          onPress: () => console.log("Share"),
        },
      ]}
    >
      <HabitCard
        id={item.id}
        name={item.name}
        description={item.description}
        days={item.days}
        maxEntries={item.maxEntries || 4}
        icon={item.icon}
        habitEntry={habitEntry}
      />
    </HoldItem>
  );

  return (
    <SafeAreaView className="flex-1 bg-background overflow-hidden relative">
      <Header
        name="Habit Tracker"
        handleRightIconPress={() => handleSettings()}
      />

      <View className="flex-1 px-4 py-2 bg-background overflow-hidden -mb-12 pb-36">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={habits}
          keyExtractor={(item) => item.name}
          className="rounded-t-lg pb-24 overflow-visible"
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={renderHabitCard}
        />
        <StatusBar style="dark" />
      </View>
    </SafeAreaView>
  );
}
