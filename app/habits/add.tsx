import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import FormField from "../components/FormField";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { guidGenerator, storeHabit } from "@/services/habitService";
import { Habit } from "@/models/models";
import { useHabitsStore } from "@/zustand/store";

const add = () => {
  const addHabit = useHabitsStore((state) => state.addHabit);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const onChangeName = (text: string) => {
    setName(text);
  };

  const onChangeDescription = (text: string) => {
    setDescription(text);
  };

  const handleCreate = () => {
    const habit: Habit = {
      id: guidGenerator(),
      name: name,
      description: description,
      days: [],
    };

    // Validate and add
    if (name.trim()) {
      addHabit(habit);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    }
  };

  return (
    <>
      <Header name="Add Habit" handlePress={() => router.back()} />
      <View className="flex-1 px-4 py-2 bg-background overflow-visible">
        <FormField
          title="Name"
          value={name}
          maxLength={42}
          placeholder={"Enter Habit Name"}
          handleChangeText={onChangeName}
          otherStyles="mb-4"
        />

        <FormField
          title="Description"
          value={description}
          maxLength={42}
          placeholder={"Enter Habit Description"}
          handleChangeText={onChangeDescription}
        />

        <PrimaryButton title="Create" onPress={() => handleCreate()} />
      </View>
    </>
  );
};

export default add;
