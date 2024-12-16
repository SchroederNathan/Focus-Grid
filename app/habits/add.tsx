import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, View, Dimensions } from "react-native";
import FormField from "../components/FormField";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { guidGenerator } from "@/services/habitService";
import { Habit } from "@/models/models";
import { useHabitsStore } from "@/zustand/store";
import { DismissKeyboard } from "@/helpers/CardHelpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { heroIcons } from "@/helpers/Icons";

const AddHabitScreen = () => {
  const addHabit = useHabitsStore((state) => state.addHabit);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<any>(null);

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
      // icon: selectedIcon!, // Optional: store selected icon
    };

    // Validate and add
    if (name.trim()) {
      addHabit(habit);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    }
  };

  // Calculate number of icons per row based on screen width
  const screenWidth = Dimensions.get("window").width;
  const iconSize = 48; // Adjust based on your design
  const iconSpacing = 12; // Space between icons
  const iconsPerRow = Math.floor(screenWidth / (iconSize + iconSpacing));

  // Chunk the icons into rows
  const chunkedIcons = heroIcons.reduce((resultArray: any, item, index) => {
    const chunkIndex = Math.floor(index / iconsPerRow);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  const renderIconRow = ({ item: iconRow }: { item: any[] }) => (
    <View className="flex-row justify-center mb-2">
      {iconRow.map((IconComponent, index) => (
        <View
          key={index}
          className={`
            bg-secondary-container 
            w-12 
            aspect-square 
            rounded-lg 
            flex 
            justify-center 
            items-center 
            mr-3 
            ${selectedIcon === IconComponent ? "border-2 border-primary" : ""}
          `}
        >
          <IconComponent
            size={24}
            strokeWidth={2}
            color="black"
            onPress={() => setSelectedIcon(IconComponent)}
          />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background overflow-visible relative">
      <Header name="Add Habit" />
      <DismissKeyboard>
        <View className="flex-1 px-4 py-2 bg-background overflow-visible">
          <FormField
            title="Name"
            value={name}
            maxLength={42}
            hideMaxLength={true}
            placeholder={"Ex. Morning Run"}
            handleChangeText={onChangeName}
            keyboardType="default"
            otherStyles="mb-4"
          />

          <FormField
            title="Description"
            value={description}
            maxLength={42}
            placeholder={"Add a brief description (optional)"}
            handleChangeText={onChangeDescription}
            keyboardType="default"
            otherStyles="mb-4"
          />

          <Text className="text-text font-lmedium mb-2">Icon</Text>

          {/* Horizontal scrolling icon rows */}
          {/* <FlatList
            data={chunkedIcons}
            renderItem={renderIconRow}
            keyExtractor={(item, index) => index.toString()}

            numColumns={5} // Display 5 icons per row
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsHorizontalScrollIndicator={false}
            className="max-h-40" // Limit height to show partial next row
          /> */}

          <PrimaryButton
            title="Create"
            otherStyles="mt-4"
            onPress={handleCreate}
            color="bg-primary"
          />
        </View>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

export default AddHabitScreen;
