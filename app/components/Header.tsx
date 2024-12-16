import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Icons from "react-native-heroicons/solid";

interface HeaderProps {
  name: string;
  handleBackPress?: () => void;
  handleRightIconPress?: () => void;
}

const Header = ({ name, handleBackPress, handleRightIconPress }: HeaderProps) => {
  return (
    <View className="h-16 flex justify-center items-center bg-background">
      {/* Header back button */}
      {handleBackPress && (
        <View className="absolute top-4 left-4">
          <TouchableOpacity onPress={() => handleBackPress()}>
            <Icons.ChevronLeftIcon fill={"#232323"} size={24} />
          </TouchableOpacity>
        </View>
      )}

      <Text className="text-xl font-lsemibold text-text">{name}</Text>

      {/* Header right icon */}
      {handleRightIconPress && (
        <View className="absolute top-4 right-4">
          <TouchableOpacity onPress={() => handleRightIconPress()}>
            <Icons.Cog6ToothIcon fill={"#232323"} size={24} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
