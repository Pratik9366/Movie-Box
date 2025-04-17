import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function LastView({movie: {title, movie_id, poster_url}, index}: LastViewCardProps){
  return (
    <Link href={`/movies/${movie_id}`} asChild >
      <TouchableOpacity style={{height: 200, width: 120}}>
       <Image source={{uri: poster_url}} className='h-56 w-full rounded-lg' resizeMode='cover'/>
       <Text className="color-white">{title}</Text>
      </TouchableOpacity>
    </Link>
  )
}