import { DismissKeyboard, guidGenerator } from "@/helpers/CardHelpers";
import { heroIcons } from "@/helpers/Icons";
import { Habit } from "@/models/models";
import { useHabitsStore } from "@/zustand/store";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
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

  // Validate and filter icons to ensure they are valid
  const validIcons = useMemo(
    () => heroIcons.filter((icon) => icon && typeof icon === "function"),
    [heroIcons]
  );

  const [selectedIconIndex, setSelectedIconIndex] = useState<number>(0); // Track selected icon by index

  const handleCreate = () => {
    const habit: Habit = {
      id: guidGenerator(),
      name: name,
      description: description,
      days: [],
      maxEntries: maxEntries,
      icon: selectedIconIndex,
    };

    if (name.trim()) {
      addHabit(habit);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    }
  };

  const renderIcon = (IconComponent: any, index: number) => {
    return (
      <TouchableOpacity
        key={`icon-${index}`}
        className={`
          bg-secondary-container 
          w-[11.5%]
          h-12
          rounded-lg 
          flex 
          justify-center 
          items-center 
          ${selectedIconIndex === index ? "border-2 border-secondary" : ""}
        `}
        onPress={() => setSelectedIconIndex(index)}
      >
        <IconComponent color={"#232323"} size={20} strokeWidth={2.2} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background overflow-visible relative">
      <Header name="Add Habit" />
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
              <View className="flex-row flex-wrap gap-[1.14%] ">
                {validIcons.map((IconComponent, index) =>
                  renderIcon(IconComponent, index)
                )}
              </View>

              <PrimaryButton
                title="Create"
                otherStyles="mt-4"
                onPress={handleCreate}
                color="bg-primary"
              />
            </View>
          </DismissKeyboard>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddHabitScreen;
