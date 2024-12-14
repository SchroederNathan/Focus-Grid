export interface HabitDay {
  date: string; // ISO format
}

export interface Habit {
  id?: number;
  name: string;
  description?: string;
  days: HabitDay[]; // Array of completed days
}
