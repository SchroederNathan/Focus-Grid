import clsx from "clsx";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Icons from "react-native-heroicons/solid";
import { generateLast90Days } from "../helpers/CardHelpers";
import { HabitDay } from "../models";

dayjs.extend(isSameOrBefore);

interface HabitProps {
  id: number | string;
  name: string;
  days: HabitDay[]; // Array of completed days
}

const HabitCard = ({ id, name, days }: HabitProps) => {
  const completedDates = days.map((day) =>
    dayjs(day.date).format("YYYY-MM-DD")
  );

  const last60Days = generateLast90Days();

  const getColor = (date: string) => {
    // Check if the current date is in the completedDates array
    return completedDates.includes(date) ? "bg-primary" : "bg-gray-200";
  };

  return (
    <View key={id} className="bg-primary/5 rounded-lg flex-col p-3">
      <View className="flex-row justify-between items-center mb-3">
        {/* Habit Name */}
        <View className="flex-col justify-center">
          <Text className="text-lg font-semibold text-text">{name}</Text>
          <Text className="text-md font-semibold text-text/70">
            Description
          </Text>
        </View>
        {/* Button */}
        <TouchableOpacity
          className="bg-primary w-12 aspect-square rounded-lg flex justify-center items-center"
          onPress={() => console.log("Button Pressed")}
        >
          <Icons.CheckIcon fill={"white"} size={24} />
        </TouchableOpacity>
      </View>
      {/* Days Grid and Button */}
      <View className="flex-row items-center ">
        {/* Days Grid */}
        <View className="flex-row flex-wrap justify-center items-center gap-[2px] -mx-3">
          {last60Days.map((day) => (
            <View
              key={day}
              className={clsx(
                "aspect-square rounded ", // Ensure a square with small margin
                completedDates.includes(day)
                  ? "bg-primary/25"
                  : "bg-secondary/20"
              )}
              style={{
                flexBasis: `${100 / 17}%`, // Adjust for a 7-column grid (or any other number of columns)
              }}
              accessibilityLabel={`Date: ${dayjs(day).format("MMM D, YYYY")}`}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default HabitCard;
