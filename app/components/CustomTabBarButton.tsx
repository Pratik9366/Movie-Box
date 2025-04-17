import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CustomTabBarButton = ({
  accessibilityState,
  label,
  icon,
  highlight,
  onPress,
}: any) => {
  const isFocused = accessibilityState?.selected;
  if (isFocused) {
    return (
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          className="flex flex-row 
            w-full 
            min-w-[112px] 
            min-h-14 
            justify-center items-center rounded-full overflow-hidden absolute gap-2 self-center"
          source={highlight}
        >
          <Image tintColor="#151312" className="size-5" source={icon}></Image>
          <Text>{label}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="size-full justify-center items-center rounded-full top-3">
        <Image source={icon} tintColor="#A8B5DB" className="size-5"></Image>
      </View>
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;
