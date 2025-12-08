import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const QUOTES = [
    "Başarı, her gün tekrarlanan küçük çabaların toplamıdır.",
    "Gelecek, bugünden ona hazırlananlara aittir.",
    "Zamanın kıymetini bil, çünkü o geri gelmeyecek hazinen.",
    "Odağını kaybetme, hedefine sadık kal.",
    "Zorluklar seni durdurmak için değil, güçlendirmek içindir.",
    "Başlamak için mükemmel olmak zorunda değilsin, ama mükemmel olmak için başlamak zorundasın.",
    "Kendine inanmak, başarının ilk kuralıdır.",
    "Bugün yaptığın fedakarlıklar, yarın yaşayacağın hayallerin bedelidir.",
    "Mazeret üretme, çözüm üret.",
    "En büyük zafer, hiç düşmemek değil, her düştüğünde kalkabilmektir."
];

export const MotivationalQuote = () => {
    const [index, setIndex] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        const interval = setInterval(() => {
            // Fade out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                // Change text
                setIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);

                // Fade in
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            });
        }, 10000); // Change every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
                "{QUOTES[index]}"
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3f2fd', // Light blue background
        padding: 15,
        borderRadius: 12,
        marginVertical: 20,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#0984e3'
    },
    text: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#2d3436',
        textAlign: 'center',
        fontWeight: '500'
    }
});
