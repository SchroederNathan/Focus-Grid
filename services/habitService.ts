import { Habit } from "@/models/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeHabit = async (habit: Habit) => {
  try {
    const newKey = guidGenerator();
    const data = {
      name: habit.name,
      description: habit.description,
      days: [],
    };
    await AsyncStorage.setItem(newKey, JSON.stringify(data)); // Convert object to string
    console.log("Data stored successfully!");
  } catch (e) {
    console.error("Error saving data: ", e); // Handle the error
  }
};
//return Habit[]
export const getAllHabits = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys(); // Retrieve all keys
    const habits = await AsyncStorage.multiGet(keys); // Fetch all key-value pairs

    // Convert the array of key-value pairs into an array of objects
    const parsedHabits: Habit[] = habits
      .map(([key, value]) => {
        try {
          return { key, ...JSON.parse(value!) }; // Parse the JSON string and include the key
        } catch (error) {
          console.error(`Error parsing JSON for key ${key}: `, error);
          return null; // Handle invalid JSON gracefully
        }
      })
      .filter((habit) => habit !== null); // Filter out any invalid entries

    console.log("Fetched Habits!", parsedHabits);
    return parsedHabits.length > 0 ? parsedHabits : []; // Return the array of objects
  } catch (e) {
    console.log("Error retrieving data: ", e);
  }
};
export const getHabit = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem("my-key");
    if (jsonValue != null) {
      const data = JSON.parse(jsonValue); // Convert string back to object
      console.log("Retrieved data:", data);
      return data;
    } else {
      console.log("No data found!");
    }
  } catch (e) {
    console.error("Error reading data: ", e); // Handle the error
  }
};

export const updateHabit = async (habit: Habit, key: string) => {
  try {
    const data = JSON.stringify(habit);
    await AsyncStorage.setItem(key, data);
    console.log("Updated data: ", data);
  } catch (e) {
    // save error
    console.log("Error updating data: ", e);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Data removed successfully!");
  } catch (e) {
    console.error("Error removing data: ", e); // Handle the error
  }
};

export function guidGenerator() {
  var S4 = function () {
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
  ); //
}
