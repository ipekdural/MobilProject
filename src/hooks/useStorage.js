import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'FOCUS_SESSIONS';

export const saveSession = async (session) => {
    try {
        const existing = await AsyncStorage.getItem(STORAGE_KEY);
        const sessions = existing ? JSON.parse(existing) : [];
        sessions.push({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            ...session
        });
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
        console.error("Failed to save session", e);
    }
};

export const getSessions = async () => {
    try {
        const existing = await AsyncStorage.getItem(STORAGE_KEY);
        return existing ? JSON.parse(existing) : [];
    } catch (e) {
        console.error("Failed to load sessions", e);
        return [];
    }
}

export const clearSessions = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error(e);
    }
}
