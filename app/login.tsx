import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button, Center, Box, Image, Text } from 'native-base';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);


        const url = 'http://localhost:1337/api/auth/local';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {

                const token = data.jwt;
                const user = data.user;


                await AsyncStorage.setItem('token', token);

                router.push('/home');
            } else {
                Alert.alert('Erro de login', data.message[0].messages[0].message);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            Alert.alert('Erro', 'Houve um problema com o login, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box alignItems="center" flex={1} bgColor={'#111827'}>
            <Image source={require('../assets/images/home.png')} resizeMode='cover' width="100%" height="1/2" alt='icon' />
            <Text color={'white'} fontSize={'2xl'} bold>Bem-vinda à minha Tenda</Text>
            <Text mb={8} color={'white'} fontSize={'md'}>por Mirella Dellazzari</Text>
            <Input
                placeholder="Email"
                value={email}
                size="lg"
                onChangeText={setEmail}
                width="80%"
                marginBottom={2}
                keyboardType="email-address"
                autoCapitalize="none"
                rounded={'full'}
                p={3}
                borderColor={'white'}
                placeholderTextColor={'gray.400'}
            />
            <Input
                placeholder="Senha"
                size="lg"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                width="80%"
                marginBottom={2}
                rounded={'full'}
                p={3}
                borderColor={'white'}
                placeholderTextColor={'gray.400'}
            />
            <Button
                disabled={loading}
                width="80%"
                size={"lg"}
                variant={'subtle'}
                backgroundColor={'amber.400'}
                rounded={'full'}
                onPress={() => handleLogin()}
            >
                {loading ? 'Entrando...' : 'Entrar'}
            </Button>
        </Box>
    );
}
