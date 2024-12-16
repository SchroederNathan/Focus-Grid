import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  color: string;
  otherStyles?: string;
}

const PrimaryButton = ({ onPress, title, color, otherStyles }: ButtonProps) => {
  console.log(color);
  return (
    <View className={`flex-row mt-auto space-x-4 ${otherStyles}`}>
      <TouchableOpacity
        className={`flex-1 py-4 rounded-lg ${color}`}
        onPress={() => onPress()}
      >
        <Text className="text-background text-center font-lsemibold text-xl">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;
