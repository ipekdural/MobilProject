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
        width: 260, height: 260, borderRadius: 130, borderWidth: 8, borderColor: '#6c5ce7',
        justifyContent: 'center', alignItems: 'center', marginBottom: 40, backgroundColor: '#fff',
        shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5
    },
    timerText: { fontSize: 64, fontWeight: '700', color: '#2d3436', fontVariant: ['tabular-nums'] },
});
