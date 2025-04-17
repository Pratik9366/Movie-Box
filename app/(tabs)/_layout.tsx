import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import CustomTabBarButton from "@/app/components/CustomTabBarButton";

const _Layout = () => {
  // * It is for bottom screen tab navigations * * * * * *
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          position: "absolute",
          marginHorizontal: 20,
          height: 48,
          borderRadius: 50,
          bottom: 45,
          elevation: 5,
          borderColor: "no"
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarButton: (props) => {     
            return <CustomTabBarButton {...props} icon={icons.home} label='Home' highlight={images.highlight} />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarButton: (props) => {
            return <CustomTabBarButton {...props} icon={icons.search} label='Search' highlight={images.highlight} />;
          },
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarButton: (props) => {
            return <CustomTabBarButton {...props} icon={icons.save} label='Save' highlight={images.highlight} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarButton: (props) => {
            return <CustomTabBarButton {...props} icon={icons.person} label='Profile' highlight={images.highlight} />;
          },
        }}
      />
    </Tabs>
  );
};

export default _Layout;
