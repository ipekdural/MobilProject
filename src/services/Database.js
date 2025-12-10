import * as SQLite from 'expo-sqlite';

let db;

const getDB = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('focus_sessions.db');
    }
    return db;
};

export const initDB = async () => {
    try {
        const database = await getDB();
        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                date TEXT NOT NULL,
                category TEXT NOT NULL,
                duration INTEGER NOT NULL,
                distractionCount INTEGER DEFAULT 0
            );
        `);
        console.log("Table created or already exists");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};

export const insertSession = async (session) => {
    try {
        const database = await getDB();
        const { id, date, category, duration, distractionCount } = session;
        await database.runAsync(
            'INSERT INTO sessions (id, date, category, duration, distractionCount) VALUES (?, ?, ?, ?, ?)',
            [id, date, category, duration, distractionCount]
        );
    } catch (error) {
        console.error("Error inserting session:", error);
        throw error;
    }
};

export const fetchSessions = async () => {
    try {
        const database = await getDB();
        const allRows = await database.getAllAsync('SELECT * FROM sessions ORDER BY date DESC');
        return allRows;
    } catch (error) {
        console.error("Error fetching sessions:", error);
        return [];
    }
};

export const clearAllSessions = async () => {
    try {
        const database = await getDB();
        await database.execAsync('DELETE FROM sessions');
    } catch (error) {
        console.error("Error clearing sessions:", error);
    }
};
