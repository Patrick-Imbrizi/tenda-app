import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                // Se o login falhar, exibe uma mensagem de erro
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderBottomWidth: 1, marginBottom: 10, width: '80%' }}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 10, width: '80%' }}
            />
            <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={loading} />
        </View>
    );
}
