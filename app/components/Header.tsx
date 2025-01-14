import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Icons from "react-native-heroicons/solid";

interface HeaderProps {
  name: string;
  accentText?: string;
  handleBackPress?: () => void;
  handleRightIconPress?: () => void;
}

const Header = ({
  name,
  accentText,
  handleBackPress,
  handleRightIconPress,
}: HeaderProps) => {
  const styling = handleBackPress ? "" : "justify-between";

  return (
    <View
      className={` py-6 mt-3 flex-row ${styling} items-center  bg-background px-6 z-50`}
    >
      {/* Header back button */}
      {handleBackPress ? (
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => handleBackPress()}
        >
          <View className="mb-2">
            <Icons.ChevronLeftIcon
              stroke={"#2f3036"}
              fill={"#2f3036"}
              strokeWidth={1.5}
              size={24}
            />
          </View>
          <View className="flex-row items-center">
            <Text className="ms-3 text-5xl  font-lsemibold text-text py-1">
              {name}
            </Text>
            {accentText && (
              <Text className="ms-3 text-5xl  font-lsemibold text-text py-1">
                {accentText}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <View className="flex-row items-center">
          <Text className="text-5xl w-100 font-lsemibold text-text py-1">
            {name}
          </Text>
          {accentText && (
            <Text className="text-5xl font-lsemibold text-primary py-1">
              {accentText}
            </Text>
          )}
        </View>
      )}

      {/* Header right icon */}
      {handleRightIconPress && (
        <TouchableOpacity
          className="p-3 -me-3"
          onPress={() => handleRightIconPress()}
        >
          <Icons.Cog6ToothIcon fill={"#2f3036"} stroke={"#2f3036"} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
