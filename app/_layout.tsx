import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
    // * It is for Dynamic stack navigation ****
  return (
      <>
       <Stack>
        <StatusBar hidden={true}/>
        <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false
            }}
        />
        <Stack.Screen
            name="movies/[id]"
            options={{
              headerShown: false
            }}
        />
      </Stack>
      </>
  )
}
