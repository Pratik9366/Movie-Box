import { getWatchlistMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { Link } from "expo-router";
import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

const Saved = () => {
  const {data: movie, loading, error} = useFetch(getWatchlistMovies)
  console.log(movie);

  return (
    <View className="flex-1 bg-primary px-5">
      <FlatList
        className=""
        data={movie}
        renderItem={({item}) => (
          <Link href={`/movies/${item.movie_id}`} asChild>
            <TouchableOpacity className="flex-row gap-5">
            <Image source={{uri: item.poster_url}} className="w-64 h-40 rounded-md " resizeMode="cover"/>
            <View className="bg-dark-100 px-5 rounded-md mb-36 py-3">
            <Text className="color-white rounded-md text-base">{item.title}</Text>
            </View>
          </TouchableOpacity>
          </Link>
        )}
        ListHeaderComponent={
            <>
            <View>
                <Text className="color-white font-semibold text-2xl mb-5 mt-20">Watchlist</Text>
            </View>
            </>
        }
      />
    </View>
  );
};

export default Saved;
