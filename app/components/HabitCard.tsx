import { generateLast90Days, getHabitStreak } from "@/helpers/CardHelpers";
import { getIconByName, heroIcons } from "@/helpers/Icons";
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
  sharingMode?: boolean;
}

const HabitCard = ({
  id,
  name,
  description,
  days,
  maxEntries,
  icon,
  sharingMode,
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

  const renderIcon = (iconName: string) => {
    const IconComponent = getIconByName(iconName);
    if (!IconComponent) return null;

    return (
      <View
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

  // Get today's entries count
  const todayEntries = dateCounts[formattedDate] || 0;

  const streak = getHabitStreak(days);

  return (
    <View
      key={id}
      className="bg-accent rounded-lg flex-col p-3 mb-3 shadow-black/10"
    >
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <View className="bg-secondary-container/ w-12 aspect-square rounded-lg flex justify-center items-center me-3">
            {renderIcon(icon)}
          </View>
          {/* Habit Name */}
          <View className="flex-col justify-center">
            {/* Habit Streak */}

            <View className="flex-row items-center">
              <Text className="text-lg font-lsemibold text-text me-1">
                {name}
              </Text>

              <Icons.FireIcon size={18} color="#2e4074" />
              <Text className="text-sm ms-0.5 font-lsemibold text-text/70">
                {streak}
              </Text>
            </View>

            {description && !sharingMode && (
              <Text className="text-md font-lsemibold text-text/70">
                {description}
              </Text>
            )}
          </View>
        </View>
        {/* Button */}
        {!sharingMode && (
          <TouchableOpacity
            className="bg-primary 2 w-12 aspect-square rounded-lg flex justify-center items-center"
            onPress={() => {
              const currentCount = dateCounts[formattedDate] || 0;
              if (currentCount < maxEntries) {
                habitEntry(id, formattedDate);
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
              } else {
                removeDateFromHabit(id, formattedDate);
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
                );
              }
            }}
          >
            <Icons.CheckIcon fill={"white"} size={24} />
          </TouchableOpacity>
        )}
      </View>
      {/* Progress Bar */}
      {maxEntries > 1 && (
        <View className="h-2 bg-secondary-container rounded-full mb-3 overflow-hidden">
          {/* Entry segments */}

          <View className="absolute top-0 left-0 right-0 bottom-0 flex-row">
            {[...Array(maxEntries)].map((_, index) => (
              <View
                key={`segment-${index}`}
                className="flex-1"
                style={{
                  backgroundColor:
                    index < todayEntries ? "#2e4074" : "transparent",
                  borderRightWidth: index < maxEntries - 1 ? 3 : 0,
                  borderColor: "#eeedf4",
                }}
              />
            ))}
          </View>
        </View>
      )}
      {/* Days Grid and Button */}
      <View className="flex-row items-center ">
        {/* Days Grid */}
        <View className="flex-1 items-center justify-center">
          <View className="w-full flex flex-row gap-[4px]">
            {Array.from({ length: Math.ceil(last60Days.length / 5) }).map(
              (_, colIndex) => (
                <View
                  key={`col-${colIndex}`}
                  className="flex-1 flex flex-col gap-[4px]"
                >
                  {last60Days
                    .slice(colIndex * 5, (colIndex + 1) * 5)
                    .map((day) => (
                      <View
                        key={day}
                        style={[
                          {
                            width: "100%",
                            aspectRatio: 1,
                            borderRadius: 4,
                          },
                          getColor(day),
                        ]}
                        accessibilityLabel={`Date: ${dayjs(day).format(
                          "MMM D, YYYY"
                        )}`}
                      />
                    ))}
                </View>
              )
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default HabitCard;
