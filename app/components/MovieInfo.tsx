import { View, Text } from 'react-native'
import React from 'react'

interface MovieInfoProps{
   lable: string,
   value?: string | number | null 
   className: string
   classNameView: string
   text?: string
}

export default function MovieInfo({lable, value, className, text, classNameView}: MovieInfoProps) {
  return (
    <View className={classNameView}>
      <Text className='text-light-200 font-normal text-sm'>{lable}</Text>
      <Text className={className}>{value || 'N/A'}
        <Text> {text}</Text>
      </Text>
    </View>
  )
}