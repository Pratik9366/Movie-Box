import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props{
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({onPress, value, onChangeText} : Props) {
  return (
    <TouchableOpacity className='flex-row items-center px-5 py-4 gap-2 bg-dark-200 rounded-full' onPress={onPress}>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor='#ab8bff'/>
      <TextInput
        onPress={onPress}
        placeholder='Search through 5000+ movies online'
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor='#ab8bff' 
        style={{color: 'white', fontSize: 15}}
      />
    </TouchableOpacity>
  )
}