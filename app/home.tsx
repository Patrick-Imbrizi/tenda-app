// app/home.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Box, HStack, Image, PlayIcon, Pressable, ScrollView, Text, useTheme, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';


export default function Home() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchTopics = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            if (!token) {
                throw new Error('Token não encontrado');
            }
            const response = await axios.get('http://localhost:1337/api/topics?populate[courses][populate]=cover', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status !== 200) {
                throw new Error('Falha ao buscar categories');
            }
            setTopics(response.data.data);
        } catch (error) {
            console.error('Erro na requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, [])


    return (
        <Box flex={1} alignItems="center" justifyContent="center" bgColor={'#111827'} p={4}>
            <ScrollView width="full">
                {topics && topics.map((topic, i) => (
                    <VStack key={i} mb={4} p={2} flex={1} overflowX={'clip'}>
                        <Text bold fontSize={20} color={'white'}>{topic.title}</Text>
                        <Text fontSize={16} color={'white'}>{topic.description}</Text>
                        <HStack space={2} py={2} overflowX={'scroll'}>
                            {topic.courses?.map((course, j) => (
                                <Pressable mt={2} borderRadius={4} key={j} w={'1/4'} backgroundColor={'black'} marginTop={2} rounded={4} height={120} onPress={() => router.push(`/course/${course.id}`)}>
                                    {course.cover && (
                                        <Image style={{ position: 'relative' }} source={{ uri: `http://localhost:1337${course.cover.formats.thumbnail.url}` }} rounded={2} resizeMode='cover' height={120} alt='bla' />
                                    )}
                                    {/* <PlayIcon color={'white'} style={{ position: 'absolute', height: '40px', width: '40px', top: '50%', left: '50%', transform: [{ translateX: -20 }, { translateY: -20 }], opacity: 0.3 }} /> */}
                                </Pressable>
                                // <Box key={j} width={'1/4'} backgroundColor={'black'} mt={2} borderRadius={4} onPress={() => router.push(`/post/${post.id}`)}>
                                // </Box>
                            ))}
                        </HStack>
                    </VStack>
                ))}
            </ScrollView>
        </Box>
    );
}


{/* <HStack key={i} mb={4} p={2} flex={1} bgColor={'primary.900'} overflowX={'clip'}>
                        <Image source={{ uri: `http://localhost:1337${post.cover.formats.thumbnail.url}` }} rounded={2} resizeMode='cover' width={60} height={'auto'} alt='bla' />
                        <VStack ml={4} overflow={'clip'} maxWidth={'80%'}>
                            <Text bold fontSize={16}>{post.title}</Text>
                            <Text lineHeight={"sm"} isTruncated>{post.description}</Text>
                            <HStack space={4}>
                                <Text>{post.duration} minutos</Text>
                                <Text></Text>
                            </HStack>
                        </VStack>
                    </HStack> */}