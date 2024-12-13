import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import clsx from "clsx";
import * as Icons from "react-native-heroicons/solid";

dayjs.extend(isSameOrBefore);

interface HabitDay {
  date: string; // ISO format
}

interface HabitProps {
  id: number | string;
  name: string;
  days: HabitDay[]; // Array of completed days
}

// Helper: Generate last 60 days
const generateLast60Days = () => {
  const today = dayjs();
  const last60Days: string[] = [];

  for (let i = 59; i >= 0; i--) {
    last60Days.push(today.subtract(i, "day").format("YYYY-MM-DD"));
  }

  return last60Days;
};

const HabitCard = ({ id, name, days }: HabitProps) => {
  const completedDates = days.map((day) =>
    dayjs(day.date).format("YYYY-MM-DD")
  );

  const last60Days = generateLast60Days();

  const getColor = (date: string) => {
    // Check if the current date is in the completedDates array
    return completedDates.includes(date) ? "bg-primary" : "bg-gray-200";
  };

  return (
    <View key={id} className="bg-primary/5 p-2 rounded-lg">
      <View className="flex-row justify-between items-center mb-3">
        {/* Habit Name */}
        <View>
          <Text className="text-lg font-semibold text-text">{name}</Text>
          <Text className="text-md font-semibold text-text/70 mb-3">
            description
          </Text>
        </View>
        {/* Button */}
        <TouchableOpacity
          className="bg-primary w-12 aspect-square rounded-lg flex justify-center items-center"
          onPress={() => console.log("Button Pressed")}
        > <Icons.CheckIcon fill={"white"} size={24}/>
        </TouchableOpacity>
      </View>
      {/* Days Grid and Button */}
      <View className="flex-row ">
        {/* Days Grid */}
        <View className="flex-row flex-wrap">
          {last60Days.map((day) => (
            <View
              key={day}
              className={clsx(
                "w-[20px] h-[20px] rounded m-[2px]",
                completedDates.includes(day) ? "bg-primary/25" : "bg-gray-200"
              )}
              accessibilityLabel={`Date: ${dayjs(day).format("MMM D, YYYY")}`}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default HabitCard;
