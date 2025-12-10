import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('focus_sessions.db');

export const initDB = () => {
    try {
        db.execSync(`
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

export const insertSession = (session) => {
    try {
        const { id, date, category, duration, distractionCount } = session;
        const statement = db.prepareSync(
            'INSERT INTO sessions (id, date, category, duration, distractionCount) VALUES ($id, $date, $category, $duration, $distractionCount)'
        );
        statement.executeSync({
            $id: id,
            $date: date,
            $category: category,
            $duration: duration,
            $distractionCount: distractionCount
        });
    } catch (error) {
        console.error("Error inserting session:", error);
        throw error;
    }
};

export const fetchSessions = () => {
    try {
        const allRows = db.getAllSync('SELECT * FROM sessions ORDER BY date DESC');
        return allRows;
    } catch (error) {
        console.error("Error fetching sessions:", error);
        return [];
    }
};

export const clearAllSessions = () => {
    try {
        db.execSync('DELETE FROM sessions');
    } catch (error) {
        console.error("Error clearing sessions:", error);
    }
};
