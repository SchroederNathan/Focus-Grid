import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Icons from "react-native-heroicons/outline";

interface NumberStepperProps {
  otherStyles?: string;
  title: string;
  value: number;
  onChange: (value: number) => void;
}

const NumberStepper = ({
  otherStyles,
  title,
  value,
  onChange,
}: NumberStepperProps) => {
  return (
    <View
      className={`${otherStyles} w-full h-14 flex flex-row justify-between items-center `}
    >
      <Text className="text-text font-lmedium mb-1">{title}</Text>
      <View className="flex-row items-center">
        <TouchableOpacity
          className={`${
            value === 0 ? "bg-secondary-container" : "bg-primary"
          } w-12 aspect-square rounded-s-lg flex justify-center items-center`}
          onPress={() => value > 0 && onChange(value - 1)}
          disabled={value === 0}
        >
          <Icons.MinusIcon color={"white"} size={24} />
        </TouchableOpacity>
        <Text className="text-text font-lmedium w-12 text-center">{value}</Text>
        <TouchableOpacity
          className={`${value >= 25 ? 'bg-secondary-container' : 'bg-primary'} w-12 aspect-square rounded-e-lg flex justify-center items-center`}
          onPress={() => value < 25 && onChange(value + 1)}
          disabled={value >= 25}
        >
          <Icons.PlusIcon color={"white"} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NumberStepper;
