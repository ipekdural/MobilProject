import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Vibration } from 'react-native';
import * as Notifications from 'expo-notifications';
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
        resetTimer,
        updateTime,
        selectedDuration
    } = useFocusTimer();

    const [sessionStarted, setSessionStarted] = useState(false);

    // Auto-finish logic...
    useEffect(() => {
        if (timeLeft === 0 && sessionStarted) {
            handleFinish();
        }
    }, [timeLeft, sessionStarted]);

    // Notifications setup
    useEffect(() => {
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Notification permissions not granted');
            }
        })();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
    }, []);

    const handleFinish = async () => {
        const duration = (selectedDuration * 60) - timeLeft;

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

            // Schedule local notification
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Seans Bitti! 🎉",
                    body: `Kategori: ${category} - Tebrikler!`,
                    sound: true,
                },
                trigger: null, // Show immediately
            });
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

    const DURATIONS = [1, 15, 25, 45, 60];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Odaklan</Text>

            <TimerDisplay seconds={timeLeft} totalDuration={selectedDuration * 60} />

            {/* Duration Selector */}
            <View style={styles.durationContainer}>
                {DURATIONS.map((dur) => (
                    <TouchableOpacity
                        key={dur}
                        style={[
                            styles.durationButton,
                            selectedDuration === dur && styles.durationButtonActive
                        ]}
                        onPress={() => !isActive && updateTime(dur)}
                        disabled={isActive || sessionStarted}
                    >
                        <Text style={[
                            styles.durationText,
                            selectedDuration === dur && styles.durationTextActive
                        ]}>{dur}dk</Text>
                    </TouchableOpacity>
                ))}
            </View>

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
    title: { fontSize: 24, fontWeight: '600', marginBottom: 20, color: '#b2bec3', letterSpacing: 1.5, textTransform: 'uppercase' },

    durationContainer: { flexDirection: 'row', gap: 10, marginBottom: 25 },
    durationButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#f1f2f6',
        borderWidth: 1,
        borderColor: '#dfe6e9'
    },
    durationButtonActive: {
        backgroundColor: '#e84393', // Pink active
        borderColor: '#e84393'
    },
    durationText: { color: '#636e72', fontWeight: '600' },
    durationTextActive: { color: '#fff' },

    pickerContainer: { marginBottom: 30, alignItems: 'center' },
    label: { marginBottom: 10, color: '#b2bec3', fontWeight: '500' },

    controls: { flexDirection: 'row', gap: 20 },
    button: {
        flexDirection: 'row',
        backgroundColor: '#e84393', // Pink
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
        gap: 10,
        shadowColor: "#e84393",
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
