import FormField from "@/app/components/FormField";
import Header from "@/app/components/Header";
import NumberStepper from "@/app/components/NumberStepper";
import PrimaryButton from "@/app/components/PrimaryButton";
import { DismissKeyboard } from "@/helpers/CardHelpers";
import { heroIcons, iconMappings } from "@/helpers/Icons";
import { Habit } from "@/models/models";
import { useHabitsStore } from "@/zustand/store";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";

const EditHabitScreen = () => {
  const { id } = useLocalSearchParams();
  const habits = useHabitsStore((state) => state.habits);
  const updateHabit = useHabitsStore((state) => state.updateHabit);

  const habit = habits.find((h) => h.id === id)!;
  
  const [name, setName] = useState(habit.name);
  const [description, setDescription] = useState(habit.description);
  const [maxEntries, setMaxEntries] = useState(habit.maxEntries);
  const [selectedIconName, setSelectedIconName] = useState(habit.icon);

  const handleUpdate = () => {
    const updatedHabit: Habit = {
      ...habit,
      name,
      description,
      maxEntries,
      icon: selectedIconName,
    };

    if (name.trim()) {
      updateHabit(updatedHabit);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    }
  };

  const renderIcon = (mapping: any) => {
    const IconComponent = mapping.icon;
    return (
      <TouchableOpacity
        key={mapping.name}
        className={`
          bg-secondary-container 
          w-[11.5%]
          h-12
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
    <SafeAreaView className="flex-1 bg-background overflow-visible relative">
      <Header name="Update Habit" />
      <View className="flex-1 overflow-hidden -mb-12">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-4 overflow-visible bg-background"
        >
          <DismissKeyboard>
            <View className="mb-44">
              <FormField
                title="Name"
                value={name}
                maxLength={42}
                hideMaxLength={true}
                placeholder={"Ex. Morning Run"}
                handleChangeText={setName}
                keyboardType="default"
                otherStyles="mb-4"
              />

              <FormField
                title="Description"
                value={description}
                maxLength={40}
                placeholder={"Add a brief description (optional)"}
                handleChangeText={setDescription}
                keyboardType="default"
                otherStyles="mb-4"
              />

              <NumberStepper
                title="Entries Per Day"
                otherStyles="mb-4"
                value={maxEntries}
                onChange={setMaxEntries}
              />

              <Text className="text-text font-lmedium mb-4">Icon</Text>
              <View className="flex-row flex-wrap gap-[1.14%]">
                {iconMappings.map((iconMapping) => renderIcon(iconMapping))}
              </View>

              <PrimaryButton
                title="Update"
                otherStyles="mt-4"
                onPress={handleUpdate}
                color="bg-primary"
              />
            </View>
          </DismissKeyboard>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditHabitScreen;
