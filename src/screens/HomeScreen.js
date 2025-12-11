import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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

        Alert.alert(
            "Seans Özeti",
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
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        enabled={!isActive}
                        style={styles.picker}
                    >
                        <Picker.Item label="Ders Çalışma" value="Ders Çalışma" />
                        <Picker.Item label="Kodlama" value="Kodlama" />
                        <Picker.Item label="Proje" value="Proje" />
                        <Picker.Item label="Kitap Okuma" value="Kitap Okuma" />
                    </Picker>
                </View>
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
    // timer styles removed
    pickerContainer: { width: '85%', marginBottom: 50 },
    label: { fontSize: 14, color: '#b2bec3', marginBottom: 12, fontWeight: '600', marginLeft: 4, letterSpacing: 0.5 },
    pickerWrapper: {
        borderWidth: 0,
        borderRadius: 20,
        backgroundColor: '#f1f2f6',
        overflow: 'hidden',
        height: 60,
        justifyContent: 'center'
    },
    picker: { height: 60, color: '#2d3436' },
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
