import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid
} from "react-native";
import MovieInfo from "../components/MovieInfo";
import { AntDesign, Zocial } from "@expo/vector-icons";
import { addToWatchList } from "@/services/appwrite";




const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  // todo: function for adding the movie details to the db through the button
  const handleWatchList = async () => {
    try {
      await addToWatchList({
        title: movie?.title,
        movie_id: movie?.id,
        poster_url: movie?.backdrop_path,
      });
      ToastAndroid.showWithGravity('Movie added to watchlist ✅', ToastAndroid.LONG, ToastAndroid.CENTER)
      console.log("Add to watchlist");
    } catch (error) {
      console.log("A error shown: when adding a movie to watchlist", error);
    }
  };


  return (
    <View className="bg-primary flex-1 bottom-5">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        hidden={true}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="flex top-20">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
            }}
            style={{ height: 250, width: 430 }}
            resizeMode="contain"
          />
        </View>
        <View className="mt-24 px-5 flex-col">
          <View className="flex-row justify-between gap-6">
            <Text
              className="color-white font-semibold text-2xl flex-1 mr-2"
              numberOfLines={1}
            >
              {movie?.title}
            </Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                className="bg-dark-100 flex items-center justify-center
          py-2 px-5 rounded-md mt-1"
              >
                <Zocial name="googleplay" color="white" size={15} />
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-dark-100 px-5 py-2 rounded-md mt-1"
                onPress={handleWatchList}
              >
                <AntDesign name="plus" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">. {movie?.runtime}m</Text>
          </View>
          <View className="flex-row gap-2 top-2">
            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white font-bold text-sm">
                {Math.round(movie?.vote_average ?? 0)}
                <Text className="text-light-200">/10</Text>
              </Text>
            </View>
            <View className="items-center bg-dark-100 px-2 py-1 rounded-md mt-2">
              <Text className="text-light-200">({movie?.vote_count}K)</Text>
            </View>
          </View>
          <MovieInfo
            lable="Overview"
            value={movie?.overview}
            classNameView="flex-col items-start justify-center mt-8"
            className="mt-2 text-gray-400"
          />
          <View className="flex-row gap-10">
            <MovieInfo
              lable="Release date"
              value={movie?.release_date}
              text="(Worldwide)"
              classNameView="flex-col items-start justify-center mt-5"
              className="color-accent mt-2"
            />
            <MovieInfo
              lable="Status"
              value={movie?.status}
              classNameView="flex-col items-start justify-center mt-5"
              className="mt-2 text-accent"
            />
          </View>
          <View className="flex-col items-start justify-center mt-5">
            <Text className="text-light-200 font-normal text-sm">Generes</Text>
            <View className="flex-row flex-wrap gap-2 mt-2">
              {movie?.genres?.length ? (
                movie.genres.map((genre, index) => (
                  <View
                    key={index}
                    className="bg-dark-100 rounded-md px-3 py-1"
                  >
                    <Text className="color-white text-sm">{genre.name}</Text>
                  </View>
                ))
              ) : (
                <Text className="text-white mt-2">N/A</Text>
              )}
            </View>
          </View>
          <MovieInfo
            lable="Countries"
            value={movie?.production_countries
              ?.map((c) => c.name)
              .join("  -  ")}
            classNameView="mt-5"
            className="color-accent mt-2"
          />
          <View className="flex-row justify-between w-1/2">
            <MovieInfo
              lable="Budget"
              value={`$${movie?.budget / 1_000_000} million`}
              classNameView="mt-5"
              className="color-accent mt-2"
            />
            <MovieInfo
              lable="Revenue"
              value={`$${Math.round(movie?.revenue / 1_000_000)} million`}
              classNameView="mt-5"
              className="color-accent mt-2"
            />
          </View>
          <MovieInfo
            lable="Production Companies"
            value={
              movie?.production_companies?.map((n) => n.name).join("  -  ") ||
              "N/A"
            }
            classNameView="mt-8"
            className="color-accent mt-2"
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 bg-accent left-0 right-0 flex flex-row mx-5 items-center justify-center rounded-md py-3 z-50"
        onPress={() => router.back()}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
