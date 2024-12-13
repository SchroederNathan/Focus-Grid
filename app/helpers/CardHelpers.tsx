import dayjs from "dayjs";
import { HabitDay } from "../models";

// Helper: Generate last 60 days
export const generateLast60Days = () => {
  const today = dayjs();
  const last60Days: string[] = [];

  for (let i = 59; i >= 0; i--) {
    last60Days.push(today.subtract(i, "day").format("YYYY-MM-DD"));
  }

  return last60Days;
};

// generate random days between the last 60 days in this format: YYYY-MM-DD for interface HabitDay= {date: string}
export const generateRandomDays = (): HabitDay[] => {
  const last60Days = generateLast60Days();
  const shuffledDays = last60Days.sort(() => 0.5 - Math.random()); // Shuffle the array
  const selectedDaysCount = Math.floor(Math.random() * last60Days.length) + 1; // Random number of days

  const randomDays: HabitDay[] = shuffledDays
    .slice(0, selectedDaysCount)
    .map((day) => ({
      date: day,
    }));

  return randomDays;
};
