import HabitCard from "@/app/components/HabitCard";
import { Habit } from "@/models/models";
import React from "react";
import { Image, ImageBackground } from "react-native";

interface ShareableHabitCardProps extends Habit {
  habitEntry: (id: string, date: string) => void;
  imgSrc: string;
}

const ShareableHabitCard = ({
  id,
  imgSrc,
  name,
  description,
  days,
  maxEntries,
  icon,
  habitEntry,
}: ShareableHabitCardProps) => {
  return (
    <ImageBackground
    //   source={require("../../../assets/images/share-background.jpg")}
      className="p-3 pb-0 rounded-lg overflow-hidden"
    >
      <HabitCard
        id={id}
        name={name}
        description={description}
        days={days}
        sharingMode={true}
        maxEntries={maxEntries || 4}
        icon={icon}
        habitEntry={habitEntry}
      />
    </ImageBackground>
  );
};

export default ShareableHabitCard;
