import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
}

const PrimaryButton = ({ onPress, title }: ButtonProps) => {
  return (
    <View className="flex-row mt-auto space-x-4">
      <TouchableOpacity
        className="flex-1 bg-primary py-4 rounded-lg"
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
