import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";
import { router } from "expo-router";

const Search = () => {
  const [searchQuary, setSearchQuary] = useState("");

  // * custom hook calling for fetching the movies from api  
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuary }), false);


  // * Call back function for search movies
  useEffect(() => {
    const timedOutId = setTimeout(async () => {
      if (searchQuary.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 1000);
    return () => clearTimeout(timedOutId);
  }, [searchQuary]);

  // * Call back function for storing the movies details in the db, that i am searching...
  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuary, movies[0]);
    }
  }, [movies]);


  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="w-full absolute z-0"
        resizeMode="cover"
      />
      <FlatList
        className="px-5"
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          gap: 16,
          marginVertical: 12,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="mt-24 mb-5">
              <SearchBar
                value={searchQuary}
                onChangeText={(text: string) => setSearchQuary(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator size="large" color="grey" className="my-3" />
            )}
            {error && (
              <Text className="text-red-600 py-3 px-5">
                Error: {error.message}
              </Text>
            )}
            {!loading && !error && searchQuary.trim() && movies?.length > 0 && (
              <Text className="text-xl font-bold text-white mb-3">
                Search Results for {""}
                <Text className="text-accent">{searchQuary}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 mx-5">
              <Text
                style={{
                  color: "#adb5bd",
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 15,
                }}
              >
                {searchQuary.trim() ? "No Movis found" : "Search for a Movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
