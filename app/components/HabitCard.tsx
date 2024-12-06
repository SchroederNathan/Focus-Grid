import { View, Text } from "react-native";
import React from "react";

//create struct
interface HabitProps {
  id: number | string;
  name: string;
}

const HabitCard = ({ id, name }: HabitProps) => {
  return (
    <View key={id} className="">
      <Text className="text-text font-lregular text-xl">{name}</Text>
      <View className="w-100 mt-1 h-24 bg-primary/5 rounded-lg"></View>
    </View>
  );
};

export default HabitCard;
