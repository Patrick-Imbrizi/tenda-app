// app/index.tsx
import React from 'react';
import { useRouter } from 'expo-router';
import { Box, Button, Center, Image, Text } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  const handlePress = async () => {
    const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   router.push('/home');
    // } else {
    //   router.push('/login');
    // }
    router.push('/login')
  };

  return (
    <Box alignItems="center" flex={1} bgColor={'#111827'}>
      <Image source={require('../assets/images/home.png')} resizeMode='cover' width="100%" height="1/2" alt='icon' />
      <Text mt={10} color={'white'} fontSize={'2xl'} bold>Bem-vinda à minha Tenda</Text>
      <Text mb={8} color={'white'} fontSize={'md'}>por Mirella Dellazzari</Text>
      <Button width="80%" size={"lg"} variant={'subtle'} backgroundColor={'amber.400'} rounded={'full'} onPress={() => handlePress()}>
        Acessar conteúdos
      </Button>
    </Box>
  );
}
