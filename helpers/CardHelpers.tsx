import dayjs from "dayjs";
import { HabitDay } from "@/models/models";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

dayjs.extend(utc);
dayjs.extend(timezone);

export const generateLast90Days = () => {
  const today = dayjs();
  const last90Days: string[] = [];

  for (let i = 89; i >= 0; i--) {
    last90Days.push(today.subtract(i, "day").format("YYYY-MM-DD"));
  }

  return last90Days;
};
// Generate's random days between the last 90 days in YYYY-MM-DD format
export const generateRandomDays = (): HabitDay[] => {
  const last90Days = generateLast90Days();
  const randomDays: HabitDay[] = [];

  for (let i = 0; i < 150; i++) {
    const randomIndex = Math.floor(Math.random() * last90Days.length); // Pick a random index from the last90Days array
    const randomDay = last90Days[randomIndex]; // Get the day at the random index
    randomDays.push({ date: randomDay }); // Push the day to randomDays array
  }

  return randomDays;
};

export const DismissKeyboard = ({ children }: { children: any }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

    {children}
  </TouchableWithoutFeedback>
);
