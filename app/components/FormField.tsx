import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  maxLength?: number;
  hideMaxLength?: boolean;
  handleChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  otherStyles?: string;
}

const FormField = ({
  title,
  value,
  placeholder,
  maxLength,
  hideMaxLength,
  handleChangeText,
  keyboardType,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [currentLength, setCurrentLength] = useState(value.length);
  const [isFocused, setIsFocused] = useState(false);

  const onTextChange = (text: string) => {
    setCurrentLength(text.length);
    handleChangeText(text);
  };
  return (
    <View className={`${otherStyles}`}>
      <Text className="text-text font-lmedium mb-1">{title}</Text>
      <View
      className={`w-full h-14 px-4 bg-accent shadow-black/10 rounded-lg flex flex-row items-center ${
        isFocused ? "border-2 border-primary" : ""
      }`}
      style={{ borderColor: isFocused ? "#3498db" : "transparent" }} // Custom color (fallback if using inline style)
    >
      <TextInput
        className="flex-1 text-text font-lregular"
        value={value}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#7B7E7E"
        onChangeText={onTextChange}
        maxLength={maxLength || undefined}
        onFocus={() => setIsFocused(true)}   // Set focus state
        onBlur={() => setIsFocused(false)}   // Remove focus state
        {...props}
      />
    </View>
      {maxLength && !hideMaxLength && (
        <Text className="text-text font-lmedium text-right mt-1">
          {`${currentLength}/${maxLength}`}
        </Text>
      )}
    </View>
  );
};

export default FormField;
