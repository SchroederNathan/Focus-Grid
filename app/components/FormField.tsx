import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  maxLength?: number;

  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const FormField = ({
  title,
  value,
  placeholder,
  maxLength,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [currentLength, setCurrentLength] = useState(value.length);

  const onTextChange = (text: string) => {
    setCurrentLength(text.length);
    handleChangeText(text);
  };
  return (
    <View className={`${otherStyles}`}>
      <Text className="text-text font-lmedium mb-1">{title}</Text>
      <View className="w-full h-14 px-4 bg-primary/5 rounded-lg focus:border-2 focus:border-primary flex flex-row items-center">
        <TextInput
          className="flex-1 text-text font-lregular"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={onTextChange}
          maxLength={maxLength || undefined}
          {...props}
        />
      </View>
      {maxLength && (
        <Text className="text-text font-lmedium text-right mt-1">
          {`${currentLength}/${maxLength}`}
        </Text>
      )}
    </View>
  );
};

export default FormField;
