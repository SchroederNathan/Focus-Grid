import { View, Text } from 'react-native'
import React from 'react'
import Header from './components/Header'
import { router } from 'expo-router'

const settings = () => {
  return (
    <View className='flex-1 bg-background px-4 py-2'>
            <Header name="Settings" handleBackPress={() => router.back()} />

      <Text>settings</Text>
    </View>
  )
}

export default settings