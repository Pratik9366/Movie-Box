import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "../components/SearchBar";
import { router } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchActionMovies, fetchHorrorMovies, fetchMovies, fetchTrendingMovies } from "@/services/api";
import MovieCard from "../components/MovieCard";
import TrendingCard from "../components/TrendingCard";
import { getLastViewMovies } from "@/services/appwrite";
import LastView from "../components/LastView";

export default function index() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => fetchTrendingMovies());

  const {
     data: LastViewSearchMovies,
     loading: LastViewLoading,
     error: LastViewError
  } = useFetch(getLastViewMovies)

  const {
    data: horrorMovies,
    loading: horrorLoading,
    error: horrorError
  } = useFetch(()=> fetchHorrorMovies())

  console.log(horrorMovies);
  
  const {
    data: actionMovies,
    loading: actionLoading,
    error: actionError
  } = useFetch(()=> fetchActionMovies())


  return (
    <View className="flex-1 bg-primary">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        hidden={true}
      />
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className=" h-10 w-12 mt-20 mb-5 mx-auto" />
{/* // todo: loading, error condition section */}
        {moviesLoading || trendingLoading || LastViewLoading || horrorLoading ? (
          <ActivityIndicator
            size="large"
            color="white"
            className="self-center mt-10"
          />
        ) : moviesError || trendingError || LastViewError || horrorError ? (
          <Text className="color-white">
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        ) : (          

          <View className="flex-1 mt-5">
            <SearchBar onPress={() => router.push("/search")} />

{/* // todo: Recommandation section/recent viewed section */}
              {LastViewSearchMovies && (
                <View className="mt-10">
                  <Text className="text-lg color-white font-bold mb-3">Recent View Movies</Text>

                  <FlatList
                   horizontal
                   data={LastViewSearchMovies}
                   renderItem={({item, index}) => (
                    <LastView movie={item} index={index}/>
                   )}
                   keyExtractor={(item) => item.movie_id.toString()}
                   className=""
                   showsHorizontalScrollIndicator={false}
                   contentContainerStyle={{
                    gap: 5
                   }}
                  />
                </View>
              )}
{/* // todo: Trending section */}       
            {trendingMovies && (
              <View className="mt-5">
                <Text className="text-lg font-bold text-white mb-3">
                  Trending Top 20 Movies Today
                </Text>

                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={trendingMovies}
                renderItem={({item, index})=>(
                  <TrendingCard movie={item} index={index}/>
                 )}
                 keyExtractor={(item) => item.id.toString()}
                 className="mt-3 mb-5"
                 contentContainerStyle={{
                  //gap: 26
                 }}
                 ItemSeparatorComponent={()=> <View className="w-3"/>}
                />
              </View>
            )}
{/*// todo: Latest section */}
            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList 
                horizontal
                className=""
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={()=> <View className="w-2"></View>}
              />
            </>
{/*// todo: Horror movies */}
            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Horror Movies
              </Text>
              <FlatList 
                horizontal
                data={horrorMovies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={()=> <View className="w-2"></View>}
                contentContainerStyle={{flexGrow: 1}}
              />
            </>

{/*// todo: Action movies */}
            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Action Movies
              </Text>
              <FlatList 
                horizontal
                className="pb-32"
                data={actionMovies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={()=> <View className="w-2"></View>}
                contentContainerStyle={{flexGrow: 1}}
              />
            </>

            
          </View>
        )}


      </ScrollView>
    </View>
  );
}
