import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useHabitsStore } from "@/zustand/store";
import Header from "@/app/components/Header";
import { DismissKeyboard } from "@/helpers/CardHelpers";
import FormField from "@/app/components/FormField";
import NumberStepper from "@/app/components/NumberStepper";
import PrimaryButton from "@/app/components/PrimaryButton";
import { heroIcons } from "@/helpers/Icons";

const edit = () => {
  const { id } = useLocalSearchParams();

  // get habit from id
  const habits = useHabitsStore((state: any) => state.habits);
  const updateHabit = useHabitsStore((state: any) => state.updateHabit);
  
  const habit = habits.find((habit: any) => habit.id === id);

  const [name, setName] = useState(habit.name);
  const [description, setDescription] = useState(habit.description);
  const [maxEntries, setMaxEntries] = useState(habit.maxEntries);
  const [selectedIconIndex, setSelectedIconIndex] = useState(habit.icon);

  // Validate and filter icons to ensure they are valid
  const validIcons = useMemo(
    () => heroIcons.filter((icon) => icon && typeof icon === "function"),
    [heroIcons]
  );

  const renderIcon = (IconComponent: any, index: number) => {
    return (
      <TouchableOpacity
        key={`icon-${index}`}
        className={`
          bg-secondary-container 
          w-12
          h-12
          rounded-lg 
          flex 
          justify-center 
          items-center 
          ${selectedIconIndex === index ? "border-2 border-secondary" : ""}
        `}
        onPress={() => setSelectedIconIndex(index)}
      >
        <IconComponent color={"#232323"} size={24} strokeWidth={2} />
      </TouchableOpacity>
    );
  };

  const handleUpdate = () => {
    // update habit
    updateHabit(id, {
      name,
      description,
      maxEntries,
      icon: selectedIconIndex,
    });

    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background overflow-visible relative">
      <Header name="Update Habit" />
      <View className="flex-1 overflow-hidden -mb-12">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-4 overflow-visible bg-background "
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

              <Text className="text-text font-lmedium mb-2">Icon</Text>

              {/* Update the icon container */}
              <View className="flex-row flex-wrap gap-2 mb-4 justify-between">
                {validIcons.map((IconComponent, index) =>
                  renderIcon(IconComponent, index)
                )}
              </View>

              <PrimaryButton
                title="Update Habit"
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

export default edit;
