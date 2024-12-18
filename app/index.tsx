import { useHabitsStore } from "@/zustand/store";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import HabitCard from "./components/HabitCard";
import Header from "./components/Header";
import { HoldItem, HoldMenuProvider } from 'react-native-hold-menu';
import { Cog6ToothIcon, PencilIcon, TrashIcon } from "react-native-heroicons/outline";

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
      items={[
        {
          text: 'Edit',
          icon: () => <PencilIcon size={18} color="#000" />,
          onPress: () => console.log('Edit pressed'),
        },
        {
          text: 'Delete',
          icon: () => <TrashIcon size={18} color="#FF0000" />,
          isDestructive: true,
          onPress: () => removeHabit(item.id),
        },
      ]}
      menuAnchorPosition="top-right"
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
    <HoldMenuProvider safeAreaInsets={insets}>
      <SafeAreaView className="flex-1 bg-background overflow-hidden relative">
        <Header
          name="Habit Tracker"
          handleRightIconPress={() => handleSettings()}
        />

        <View className="flex-1 px-4 py-2 bg-background overflow-hidden -mb-12 pb-36">
          <FlatList
            data={habits}
            keyExtractor={(item) => item.name}
            className="rounded-t-lg pb-24 overflow-visible"
            ItemSeparatorComponent={() => <View className="h-3" />}
            renderItem={renderHabitCard}
          />
          <StatusBar style="dark" />
        </View>
      </SafeAreaView>
    </HoldMenuProvider>
  );
}
