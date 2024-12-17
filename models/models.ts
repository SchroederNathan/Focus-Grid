export interface HabitDay {
  date: string; // ISO format
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon: number;
  days: HabitDay[]; // Array of completed days
}
