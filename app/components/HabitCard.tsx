import { generateLast90Days } from "@/helpers/CardHelpers";
import { heroIcons } from "@/helpers/Icons";
import { Habit } from "@/models/models";
import { useHabitsStore } from "@/zustand/store";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // import plugin
import utc from "dayjs/plugin/utc"; // Day.js timezone depends on utc plugin
import * as Haptics from "expo-haptics";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Icons from "react-native-heroicons/solid";

dayjs.extend(utc); // use plugin
dayjs.extend(timezone); // use plugin

interface HabitProps extends Habit {
  habitEntry: (id: string, date: string) => void;
}

const HabitCard = ({
  id,
  name,
  description,
  days,
  maxEntries,
  icon,
  habitEntry,
}: HabitProps) => {
  const completedDates = days.map((day) =>
    dayjs(day.date).format("YYYY-MM-DD")
  );

  const removeDateFromHabit = useHabitsStore(
    (state: any) => state.removeDateFromHabit
  );

  // Validate and filter icons to ensure they are valid
  const validIcons = useMemo(
    () => heroIcons.filter((icon) => icon && typeof icon === "function"),
    [heroIcons]
  );

  const last60Days = generateLast90Days();
  const currentDate = dayjs();
  const formattedDate = currentDate.format("YYYY-MM-DD");

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

    if (count === 0)
      return {
        backgroundColor: "#dad9e0",
      };

    // Scale opacity from 0.1 to 1.0
    const opacity = 0.1 + 0.9 * Math.min(count / maxEntries, 1);

    return {
      backgroundColor: "#2e4074",
      opacity: opacity,
    };
  };

  const renderIcon = (IconComponent: any, index: number) => {
    return (
      <View
        key={`icon-${index}`}
        className={`
          bg-secondary-container 
          w-12
          h-12
          rounded-lg 
          flex 
          justify-center 
          items-center 
        `}
      >
        <IconComponent color={"#232323"} size={24} strokeWidth={2} />
      </View>
    );
  };

  return (
    <View
      key={id}
      className="bg-accent rounded-lg flex-col p-3 mb-3 shadow-black/10"
    >
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <View className="bg-secondary-container/ w-12 aspect-square rounded-lg flex justify-center items-center me-3">
            {renderIcon(validIcons[icon], icon)}
          </View>
          {/* Habit Name */}
          <View className="flex-col justify-center">
            <Text className="text-lg font-lsemibold text-text ">{name}</Text>
            {description && (
              <Text className="text-md font-lsemibold text-text/70">
                {description}
              </Text>
            )}
          </View>
        </View>
        {/* Button */}
        <TouchableOpacity
          className="bg-primary 2 w-12 aspect-square rounded-lg flex justify-center items-center"
          onPress={() => {
            if (dateCounts[formattedDate] < maxEntries || days.length === 0) {
              habitEntry(id, formattedDate);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            } else {
              //update habit to remove any instances of formattedDate
              removeDateFromHabit(id, formattedDate);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

            }

          }}
        >
          <Icons.CheckIcon fill={"white"} size={24} />
        </TouchableOpacity>
      </View>
      {/* Days Grid and Button */}
      <View className="flex-row items-center ">
        {/* Days Grid */}
        <View className="flex-row flex-wrap justify-center items-center gap-[4px] -mx-2">
          {last60Days.map((day) => (
            <View
              key={day}
              style={[
                {
                  aspectRatio: 1,
                  borderRadius: 6,
                  flexBasis: `${100 / 23}%`,
                },
                getColor(day),
              ]}
              accessibilityLabel={`Date: ${dayjs(day).format("MMM D, YYYY")}`}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default HabitCard;
