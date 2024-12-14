import React from "react";
import { Text, TextInput, View } from "react-native";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  return (
    <View className={`${otherStyles}`}>
      <Text className="text-text font-lmedium mb-1">{title}</Text>
      <View className="w-full h-14 px-4 bg-primary/5 rounded-lg focus:border-2 focus:border-primary flex flex-row items-center">
        <TextInput
          className="flex-1 text-text font-lregular"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
