import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Icons from "react-native-heroicons/solid";
import { router } from "expo-router";

interface HeaderProps {
  name: string;
  handlePress: () => void;
}

const Header = ({ name, handlePress }: HeaderProps) => {


  return (
    <View className="h-16 flex justify-center items-center bg-background">
      {/* Header back button */}
      {handlePress && (
        <View className="absolute top-4 left-4">
          <TouchableOpacity onPress={() => handlePress()}>
            <Icons.ChevronLeftIcon fill={"#0b357f"} size={24} />
          </TouchableOpacity>
        </View>
      )}

      <Text className="text-xl font-lsemibold text-text">{name}</Text>
    </View>
  );
};

export default Header;
