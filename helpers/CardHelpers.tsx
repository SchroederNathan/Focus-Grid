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
  // Sort days by date in descending order
  const sortedDays = [...days].sort(
    (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
  );

  let streak = 0;
  let currentDate = dayjs();

  // Count consecutive days from today backwards
  for (let i = 0; i < sortedDays.length; i++) {
    const date = dayjs(sortedDays[i].date);

    // If this is the first day, just increment streak
    if (i === 0) {
      if (date.isSame(currentDate, "day")) {
        streak++;
        currentDate = currentDate.subtract(1, "day");
        continue;
      } else {
        break;
      }
    }

    // Check if this date is consecutive with previous date
    if (date.isSame(currentDate, "day")) {
      streak++;
      currentDate = currentDate.subtract(1, "day");
    } else {
      break;
    }
  }

  return streak;
};

export const DismissKeyboard = ({ children }: { children: any }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
