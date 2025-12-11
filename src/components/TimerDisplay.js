import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TimerDisplay = ({ seconds }) => {
    const formatTime = (s) => {
        const min = Math.floor(s / 60);
        const sec = s % 60;
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    timerContainer: {
        width: 280,
        height: 280,
        borderRadius: 140,
        borderWidth: 6,
        borderColor: '#a29bfe', // Softer purple
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        backgroundColor: '#fff',
        shadowColor: "#6c5ce7",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
    },
    timerText: {
        fontSize: 72,
        fontWeight: '300', // Lighter font weight for modern look
        color: '#2d3436',
        fontVariant: ['tabular-nums'],
        letterSpacing: 2
    },
});
