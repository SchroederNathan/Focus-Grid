import { HabitDay } from "@/models/models";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
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

export const guidGenerator = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export const getHabitStreak = (days: HabitDay[]) => {
  if (!days || days.length === 0) return 0;

  const today = dayjs();
  const yesterday = today.subtract(1, "day");
  let streak = 0;
  let currentDate = yesterday; // Start checking from yesterday

  // Create a Set of dates for O(1) lookup
  const datesSet = new Set(days.map((day) => day.date));

  // Count backwards from yesterday until we find a day that wasn't completed
  while (datesSet.has(currentDate.format("YYYY-MM-DD"))) {
    streak++;
    currentDate = currentDate.subtract(1, "day");
  }

  // If we have a streak and today is already completed, add one more day
  if (datesSet.has(today.format("YYYY-MM-DD"))) {
    streak++;
  }

  return streak;
};

export const DismissKeyboard = ({ children }: { children: any }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
