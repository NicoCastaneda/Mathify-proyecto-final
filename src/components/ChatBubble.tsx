import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'


interface ChatBubbleProps {
    role: string;
    text: string;
}

export function ChatBubble({ role, text}: ChatBubbleProps): JSX.Element {
    return (
        <View
            style={[styles.chatItem, role === "user" ? styles.userChat : styles.modelChat]}
        >
            <Text style={styles.chatText}>{text}</Text>
            {role === "model"}
        </View>
    )
}

const styles = StyleSheet.create({
    chatItem: {
        padding: 10,
        marginVertical: 5,
        maxWidth: "80%",
        borderRadius: 10,
        position: "relative",
    },
    userChat: {
        alignSelf: "flex-end",
        backgroundColor: "#333",
    },
    modelChat: {
        alignSelf: "flex-start",
        backgroundColor: "#007AFF",
    },
    chatText: {
        color: "white",
    },
    speakerIcon: {
        position: "absolute",
        right: -30,
        top: 5,
    },
});
