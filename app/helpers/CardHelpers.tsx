import dayjs from "dayjs";
import { HabitDay } from "../models";

// Helper: Generate last 60 days
export const generateLast90Days = () => {
  const today = dayjs();
  const last90Days: string[] = [];

  for (let i = 89; i >= 0; i--) {
    last90Days.push(today.subtract(i, "day").format("YYYY-MM-DD"));
  }
  console.log(last90Days);

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
