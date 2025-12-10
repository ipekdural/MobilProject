import { initDB, insertSession, fetchSessions, clearAllSessions } from '../services/Database';

// Initialize the database immediately
initDB().catch(e => console.error("DB Init error:", e));

export const saveSession = async (session) => {
    // Adapter to match previous calling convention
    // session object comes in without id and full date usually, or we can handle construction here
    const newSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...session
    };

    // SQLite insert
    await insertSession(newSession);
};

export const getSessions = async () => {
    // Return all sessions
    return await fetchSessions();
}

export const clearSessions = async () => {
    await clearAllSessions();
}
