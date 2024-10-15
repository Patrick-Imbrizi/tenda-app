import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Text } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useLocalSearchParams();

    const fetchPost = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado');
            }
            const response = await axios.get(`http://localhost:1337/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status !== 200) {
                throw new Error('Falha ao buscar post');
            }
            setPost(response.data.data);
        } catch (error) {
            console.error('Erro na requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    return (
        <>
            <Text>{id}</Text>
        </>
    )
}