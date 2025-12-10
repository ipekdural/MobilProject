import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

export const TimerDisplay = ({ seconds, totalDuration }) => {
    const radius = 120;
    const strokeWidth = 15;
    const circumference = 2 * Math.PI * radius;
    const center = radius + strokeWidth;

    // progress: 1 means full, 0 means empty
    // If totalDuration is missing (initial load), default to max to show full circle
    const progress = totalDuration > 0 ? seconds / totalDuration : 1;
    const strokeDashoffset = circumference * (1 - progress);

    const formatTime = (s) => {
        const min = Math.floor(s / 60);
        const sec = s % 60;
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    return (
        <View style={styles.container}>
            <Svg width={center * 2} height={center * 2}>
                <G rotation="-90" origin={`${center}, ${center}`}>
                    {/* Background Circle */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#f1f2f6" // Light gray/white background
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#e84393" // Pink
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                    />
                </G>
            </Svg>
            <View style={styles.textContainer}>
                <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        fontSize: 64, // Slightly smaller to fit nicely inside ring
        fontWeight: '300',
        color: '#2d3436',
        fontVariant: ['tabular-nums'],
        letterSpacing: 2
    },
});
