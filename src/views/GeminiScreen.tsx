import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChatBubble } from '../components/ChatBubble';

type RootStackParamList = {
    Exercise: undefined;
    Gemini: { equation: string };
};

type GeminiScreenRouteProp = RouteProp<RootStackParamList, 'Gemini'>;
type GeminiScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Gemini'>;

interface ChatMessage {
    role: string;
    parts: { text: string }[];
}

export default function GeminiScreen() {
    const navigation = useNavigation<GeminiScreenNavigationProp>();
    const route = useRoute<GeminiScreenRouteProp>();
    const { equation } = route.params;

    const [chat, setChat] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const API_KEY = 'AIzaSyBD9a96gRkiTsbnL9ExCBRVyLJaotFGvL8';

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setChat([]);
            handleUserInput(equation);
        });
    
        return unsubscribe;
    }, [navigation, equation]);

    const instruccion = "Step by step solution: \n\n";
    const handleUserInput = async (userInput: string) => {
        const userInputWithInstruction = instruccion + userInput;
        const updatedChatWithUserInput: ChatMessage = {
            role: "user",
            parts: [{ text: userInputWithInstruction }],
        };
        console.log("User input:", userInputWithInstruction);
        setLoading(true);

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: userInputWithInstruction }],
                        }
                    ]
                }
            );

            const modelResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (modelResponse) {
                setChat(prevChat => {
                    const updatedChat = Array.isArray(prevChat) ? [...prevChat, updatedChatWithUserInput, { role: "model", parts: [{ text: modelResponse }] }] : [updatedChatWithUserInput, { role: "model", parts: [{ text: modelResponse }] }];
                    return updatedChat;
                });
            }
        } catch (error: any) {
            console.error("Error from Gemini pro", error);
            console.error("Error response:", error.response);
            setError("An error occurred. Please try again");
        } finally {
            setLoading(false);
        }
    };

    const renderChatItem = ({ item }: { item: ChatMessage }) => {
        if (Array.isArray(item.parts) && item.parts.length > 0) {
            return (
                <ChatBubble
                    role={item.role}
                    text={item.parts[0].text}
                />
            );
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={chat}
                renderItem={renderChatItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
            />
            {loading && <ActivityIndicator style={styles.loading} color="#333" />}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 16,
    },
    loading: {
        marginTop: 10,
    },
    error: {
        color: "red",
        marginTop: 10,
    },
});
