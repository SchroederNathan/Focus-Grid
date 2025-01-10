import { DismissKeyboard, guidGenerator } from "@/helpers/CardHelpers";
import { iconMappings } from "@/helpers/Icons";
import { Habit } from "@/models/models";
import { useHabitsStore } from "@/zustand/store";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import Header from "../components/Header";
import NumberStepper from "../components/NumberStepper";
import PrimaryButton from "../components/PrimaryButton";

const AddHabitScreen = () => {
  const addHabit = useHabitsStore((state) => state.addHabit);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maxEntries, setMaxEntries] = useState<number>(1);
  const [selectedIconName, setSelectedIconName] = useState<string>("Exercise"); // Default icon

  const handleCreate = () => {
    const habit: Habit = {
      id: guidGenerator(),
      name: name,
      description: description,
      days: [],
      maxEntries: maxEntries,
      icon: selectedIconName,
    };

    if (name.trim()) {
      addHabit(habit);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    }
  };

  const renderIcon = (mapping: any) => {
    const IconComponent = mapping.icon;
    return (
      <TouchableOpacity
        key={`icon-${mapping.name}`}
        className={`
          bg-secondary-container 
          w-[11.5%]
          h-14
          rounded-lg 
          flex 
          justify-center 
          items-center 
          ${selectedIconName === mapping.name ? "border-2 border-secondary" : ""}
        `}
        onPress={() => setSelectedIconName(mapping.name)}
      >
        <IconComponent color={"#232323"} size={20} strokeWidth={2.2} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background ">
      <Header name="New Habit" handleBackPress={() => router.back()} />
      <ScrollView className="flex-1 bg-background px-4 py-2 mb-28 overflow-visible">
        <FormField
          title="Name"
          value={name}
          placeholder="Habit name"
          maxLength={24}
          handleChangeText={setName}
          otherStyles="mb-4"
        />
        <FormField
          title="Description (optional)"
          value={description}
          placeholder="Add a description"
          maxLength={48}
          handleChangeText={setDescription}
          otherStyles="mb-4"
        />
        <NumberStepper
          title="Daily Goal"
          value={maxEntries}
          onChange={setMaxEntries}
          otherStyles="mb-4"
        />

        <Text className="text-text font-lmedium mb-4">Icon</Text>
        <View className="flex-row flex-wrap gap-[1.14%]">
          {iconMappings.map((iconMapping) => renderIcon(iconMapping))}
        </View>
        <View className=" mt-4">
        <PrimaryButton
          title="Create Habit"
          color={"bg-primary"}
          onPress={handleCreate}
        />
      </View>
      </ScrollView>


    </SafeAreaView>
  );
};

export default AddHabitScreen;
