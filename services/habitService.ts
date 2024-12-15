import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeHabit = async (name: string, description: string) => {
  try {
    const newKey = crypto.randomUUID();
    const data = {
      name: name,
      description: description,
    };
    await AsyncStorage.setItem(newKey, JSON.stringify(data)); // Convert object to string
    console.log("Data stored successfully!");
  } catch (e) {
    console.error("Error saving data: ", e); // Handle the error
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

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Data removed successfully!");
  } catch (e) {
    console.error("Error removing data: ", e); // Handle the error
  }
};
