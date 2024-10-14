import { Stack } from "expo-router";
import { extendTheme, NativeBaseProvider } from "native-base";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle('light');
    }, 0);
  }, []);


  return (
    <NativeBaseProvider theme={customTheme}>
      <Stack screenOptions={{ headerStyle: { backgroundColor: 'transparent' }, headerTintColor: 'white' }}>
        <Stack.Screen name="index" options={{ title: "Página Inicial", headerShown: false }} />
        <Stack.Screen name="home" options={{ title: "Conteúdos", headerStyle: { backgroundColor: '#111827' }, headerTintColor: 'white', headerShown: true }} />
        <Stack.Screen name="login" options={{ title: "Login", headerTransparent: true, headerBlurEffect: 'extraLight' }} />
      </Stack>
    </NativeBaseProvider>
  );
}
