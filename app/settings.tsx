import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";

const settings = () => {
  return (
    <SafeAreaView className="flex-1 bg-background overflow-visible relative">
      <View className="flex-1 bg-background px-4 py-2 z-50">
        <Header name="Settings" handleBackPress={() => router.back()} />

        <Text>settings</Text>
      </View>
    </SafeAreaView>
  );
};

export default settings;
