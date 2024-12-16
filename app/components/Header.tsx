import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Icons from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  name: string;
  handleBackPress?: () => void;
  handleRightIconPress?: () => void;
}

const Header = ({
  name,
  handleBackPress,
  handleRightIconPress,
}: HeaderProps) => {
  const styling = handleBackPress ? "" : "justify-between";

  return (
    <View className={` py-6 mt-3 flex-row ${styling} items-center  bg-background px-6 z-50`}>
      {/* Header back button */}
      {handleBackPress ? (
        <TouchableOpacity
          className="flex-row items-center "
          onPress={() => handleBackPress()}
        >
          <Icons.ChevronLeftIcon fill={"#232323"} size={24} />
          <Text className="ms-3 text-5xl w-100 font-lsemibold text-text">
            {name}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-5xl w-100 font-lsemibold text-text py-1">
          {name}
        </Text>
      )}

      {/* Header right icon */}
      {handleRightIconPress && (
        <TouchableOpacity
          className="p-3 -me-3"
          onPress={() => handleRightIconPress()}
        >
          <Icons.Cog6ToothIcon fill={"#232323"} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
