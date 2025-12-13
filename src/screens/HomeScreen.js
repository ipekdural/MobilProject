import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Vibration } from 'react-native';
import { CategoryPicker } from '../components/CategoryPicker';
import { useFocusTimer } from '../hooks/useFocusTimer';
import { saveSession } from '../hooks/useStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause, RotateCcw } from 'lucide-react-native';
import { TimerDisplay } from '../components/TimerDisplay';
import { MotivationalQuote } from '../components/MotivationalQuote';

export default function HomeScreen() {
    const {
        timeLeft,
        isActive,
        distractionCount,
        category,
        setCategory,
        toggleTimer,
        resetTimer
    } = useFocusTimer();

    const [sessionStarted, setSessionStarted] = useState(false);
    const INITIAL_TIME = 25 * 60;

    // Auto-finish when time hits 0
    useEffect(() => {
        if (timeLeft === 0 && sessionStarted) {
            handleFinish();
        }
    }, [timeLeft, sessionStarted]);

    const handleFinish = async () => {
        const duration = INITIAL_TIME - timeLeft;

        // Prevent saving 0 duration sessions
        if (duration < 5) {
            Alert.alert("Bilgi", "Seans çok kısa sürdü, kaydedilmedi.");
            resetTimer();
            setSessionStarted(false);
            return;
        }

        const sessionData = {
            category,
            duration,
            distractionCount
        };

        await saveSession(sessionData);

        if (Platform.OS !== 'web') {
            Vibration.vibrate();
        }

        Alert.alert(
            "Seans Bitti! 🎉",
            `Kategori: ${category}\nSüre: ${Math.floor(duration / 60)} dk ${duration % 60} sn\nDikkat Dağılması: ${distractionCount}`,
            [{
                text: "Tamam", onPress: () => {
                    resetTimer();
                    setSessionStarted(false);
                }
            }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Odaklan</Text>

            <TimerDisplay seconds={timeLeft} />

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Kategori Seç:</Text>
                <CategoryPicker
                    selectedCategory={category}
                    onCategoryChange={setCategory}
                    enabled={!isActive}
                />
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    if (!isActive && !sessionStarted) setSessionStarted(true);
                    toggleTimer();
                }}>
                    {isActive ? <Pause color="#fff" size={24} /> : <Play color="#fff" size={24} />}
                    <Text style={styles.buttonText}>{isActive ? "Duraklat" : "Başlat"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => {
                    if (Platform.OS === 'web') {
                        if (sessionStarted) {
                            // Simple confirm for web
                            if (window.confirm("Seansı bitirip kaydetmek istiyor musunuz? İptal derseniz süre sıfırlanır ancak kaydedilmez.")) {
                                handleFinish();
                            } else {
                                resetTimer();
                                setSessionStarted(false);
                            }
                        } else {
                            resetTimer();
                        }
                    } else {
                        // Mobile Alert
                        if (sessionStarted) {
                            Alert.alert("Seansı Bitir?", "Veriler kaydedilecek.", [
                                { text: "İptal", style: "cancel" },
                                { text: "Bitir ve Kaydet", onPress: handleFinish },
                                {
                                    text: "Sıfırla (Kaydetme)", onPress: () => {
                                        resetTimer();
                                        setSessionStarted(false);
                                    }
                                }
                            ]);
                        } else {
                            resetTimer();
                        }
                    }
                }}>
                    <RotateCcw color="#636e72" size={24} />
                    <Text style={[styles.buttonText, { color: '#636e72' }]}>Sıfırla</Text>
                </TouchableOpacity>
            </View>

            {distractionCount > 0 && (
                <Text style={styles.distractionText}>⚠️ Dikkat Dağılması: {distractionCount}</Text>
            )}

            <MotivationalQuote />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fdfdfd', alignItems: 'center', justifyContent: 'center', paddingBottom: 80 },
    title: { fontSize: 24, fontWeight: '600', marginBottom: 30, color: '#b2bec3', letterSpacing: 1.5, textTransform: 'uppercase' },

    controls: { flexDirection: 'row', gap: 20 },
    button: {
        flexDirection: 'row',
        backgroundColor: '#6c5ce7',
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
        gap: 10,
        shadowColor: "#6c5ce7",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6
    },
    resetButton: {
        backgroundColor: '#fff',
        shadowColor: "#b2bec3",
        borderWidth: 1,
        borderColor: '#dfe6e9',
        elevation: 2
    },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', letterSpacing: 0.5 },
    distractionText: { marginTop: 25, color: '#ff7675', fontSize: 16, fontWeight: '600' }
});
