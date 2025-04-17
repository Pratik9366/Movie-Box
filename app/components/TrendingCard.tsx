import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

export default function TrendingCard({
  movie: { title, poster_path, id },
  index,
}: TrendingCardProps) {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-36 relative pl-5">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="h-48 w-full rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute -bottom-1 -left-3.5 px-3 py-1 ">
          <MaskedView
            maskElement={
              <Text className="font-extrabold color-white text-7xl">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient2}
              className="h-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
