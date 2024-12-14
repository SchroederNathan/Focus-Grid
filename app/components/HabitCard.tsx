import clsx from "clsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // import plugin
import utc from "dayjs/plugin/utc"; // Day.js timezone depends on utc plugin
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Icons from "react-native-heroicons/solid";
import { generateLast90Days } from "../helpers/CardHelpers";
import { Habit } from "../models";

dayjs.extend(utc); // use plugin
dayjs.extend(timezone); // use plugin

// dayjs.extend(isSameOrBefore);

interface HabitProps extends Habit {
  habitEntry: (id: number) => void;
}

const HabitCard = ({ id, name, description, days, habitEntry }: HabitProps) => {
  const completedDates = days.map((day) =>
    dayjs(day.date).format("YYYY-MM-DD")
  );

  const last60Days = generateLast90Days();

  // Count occurrences of each date
  const dateCounts: Record<string, number> = completedDates.reduce(
    (acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Function to map count to opacity class
  const getColor = (date: string) => {
    const count = dateCounts[date] || 0;
    if (count >= 4) return "bg-primary"; // Full opacity
    if (count === 3) return "bg-primary/75";
    if (count === 2) return "bg-primary/50";
    if (count === 1) return "bg-primary/25";
    return "bg-primary/5"; // Default for uncompleted days
  };

  return (
    <View key={id} className="bg-primary/5 rounded-lg flex-col p-3">
      <View className="flex-row justify-between items-center mb-3">
        {/* Habit Name */}
        <View className="flex-col justify-center">
          <Text className="text-xl font-semibold text-text ">{name}</Text>
          {description && (
            <Text className="text-lg font-semibold text-text/70">
              {description}
            </Text>
          )}
        </View>
        {/* Button */}
        <TouchableOpacity
          className="bg-primary w-12 aspect-square rounded-lg flex justify-center items-center"
          onPress={() => habitEntry(id!)}
        >
          <Icons.CheckIcon fill={"white"} size={24} />
        </TouchableOpacity>
      </View>
      {/* Days Grid and Button */}
      <View className="flex-row items-center ">
        {/* Days Grid */}
        <View className="flex-row flex-wrap justify-center items-center gap-[2px] -mx-3 rounded-2xl overflow-hidden ">
          {last60Days.map((day) => (
            <View
              key={day}
              className={clsx(
                "aspect-square rounded", // Ensure a square with small margin
                getColor(day)
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
