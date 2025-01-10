import { useHabitsStore } from "@/zustand/store";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  FlatList,
  View,
  Platform,
  Share,
  Linking,
  ImageBackground,
} from "react-native";
import { PencilIcon, TrashIcon } from "react-native-heroicons/outline";
import { HoldItem } from "react-native-hold-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import HabitCard from "./components/HabitCard";
import Header from "./components/Header";
import { ShareIcon } from "react-native-heroicons/solid";
import ViewShot from "react-native-view-shot";
import { Habit } from "@/models/models";
import * as SMS from "expo-sms";
import ShareableHabitCard from "./habits/sharing/ShareableHabitCard";
import { getHabitStreak } from "@/helpers/CardHelpers";

export default function Home() {
  const router = useRouter();
  const viewShotRefs = useRef<Record<string, any>>({});
  const [sharingHabitId, setSharingHabitId] = useState<string | null>(null);

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

  const handleShare = async (id: string) => {
    try {
      const habitToShare = habits.find((habit: Habit) => habit.id === id);
      if (!habitToShare || !viewShotRefs.current[id]) return;

      // Set the sharing state
      setSharingHabitId(id);

      // Wait a moment for the state to update and render
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Capture the image
      const uri = await viewShotRefs.current[id].capture();

      // Reset sharing state
      setSharingHabitId(null);

      const message = `I've been crushing my ${
        habitToShare.name
      } habit - ${getHabitStreak(habitToShare.days)} days and counting!`;

      if (Platform.OS === "android") {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
          await SMS.sendSMSAsync([], message, {
            attachments: {
              uri: uri,
              mimeType: "image/png",
              filename: "habit.png",
            },
          });
        }
      } else if (Platform.OS === "ios") {
        await Share.share({
          message: message,
          url: uri,
        });
      }
    } catch (error) {
      console.error("Error sharing habit:", error);
    }
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
          onPress: () => handleShare(item.id),
        },
      ]}
    >
      <ViewShot
        ref={(ref) => (viewShotRefs.current[item.id] = ref)}
        options={{
          format: "png",
          quality: 1,
          result: "tmpfile",
        }}
      >
        {sharingHabitId === item.id ? (
          <ShareableHabitCard {...item} habitEntry={habitEntry} />
        ) : (
          <HabitCard
            id={item.id}
            name={item.name}
            description={item.description}
            days={item.days}
            maxEntries={item.maxEntries || 4}
            icon={item.icon}
            habitEntry={habitEntry}
          />
        )}
      </ViewShot>
    </HoldItem>
  );

  return (
    <SafeAreaView className="flex-1 bg-background overflow-hidden relative">
      <Header
        name="Focus"
        accentText="Grid."
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
