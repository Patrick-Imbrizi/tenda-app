// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Página Inicial" }} />
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
}
