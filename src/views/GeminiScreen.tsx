import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChatBubble } from '../components/ChatBubble';
import { AppContext } from "../context/AppContext";

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
    const { help } = useContext(AppContext)
    const equation = help.problema
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

    const instruccion = `${help.enunciado_general}: \n\n`;
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
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator style={styles.loading} color="#333" size="large" />
                </View>
            )}
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
        justifyContent: "flex-start",
        paddingHorizontal: 16,
        paddingTop: 150,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: "red",
        marginTop: 10,
    },
});
