import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusTimer } from '../hooks/useFocusTimer';
import { saveSession } from '../hooks/useStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause, RotateCcw } from 'lucide-react-native';

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

    const formatTime = (s) => {
        const min = Math.floor(s / 60);
        const sec = s % 60;
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

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

            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>

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
                    if (sessionStarted) {
                        Alert.alert("Seansı Bitir?", "Veriler kaydedilecek.", [
                            { text: "İptal", style: "cancel" },
                            { text: "Bitir ve Kaydet", onPress: handleFinish },
                            { text: "Sıfırla (Kaydetme)", onPress: () => { resetTimer(); setSessionStarted(false); } }
                        ])
                    } else {
                        resetTimer();
                    }
                }}>
                    <RotateCcw color="#fff" size={24} />
                    <Text style={styles.buttonText}>Sıfırla</Text>
                </TouchableOpacity>
            </View>

            {distractionCount > 0 && (
                <Text style={styles.distractionText}>⚠️ Dikkat Dağılması: {distractionCount}</Text>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40, color: '#2d3436' },
    timerContainer: {
        width: 260, height: 260, borderRadius: 130, borderWidth: 8, borderColor: '#6c5ce7',
        justifyContent: 'center', alignItems: 'center', marginBottom: 40, backgroundColor: '#fff',
        shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5
    },
    timerText: { fontSize: 64, fontWeight: '700', color: '#2d3436', fontVariant: ['tabular-nums'] },
    pickerContainer: { width: '85%', marginBottom: 40 },
    label: { fontSize: 16, color: '#636e72', marginBottom: 8, fontWeight: '600' },
    pickerWrapper: { borderWidth: 1, borderColor: '#dfe6e9', borderRadius: 12, backgroundColor: '#fff', overflow: 'hidden' },
    picker: { height: 55 },
    controls: { flexDirection: 'row', gap: 20 },
    button: {
        flexDirection: 'row', backgroundColor: '#6c5ce7', paddingVertical: 14, paddingHorizontal: 28,
        borderRadius: 16, alignItems: 'center', gap: 8,
        shadowColor: "#6c5ce7", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 3
    },
    resetButton: { backgroundColor: '#ff7675', shadowColor: "#ff7675" },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
    distractionText: { marginTop: 25, color: '#d63031', fontSize: 16, fontWeight: '600' }
});
