import { useState, useEffect, useRef, useCallback } from 'react';
import { AppState } from 'react-native';

export const useFocusTimer = (initialMinutes = 25) => {
    const [selectedDuration, setSelectedDuration] = useState(initialMinutes);
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [isActive, setIsActive] = useState(false);
    const [distractionCount, setDistractionCount] = useState(0);
    const [category, setCategory] = useState('Ders Çalışma');
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current === 'active' &&
                nextAppState.match(/inactive|background/)
            ) {
                if (isActive) {
                    setIsActive(false); // Auto pause
                    setDistractionCount(prev => prev + 1);
                }
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, [isActive]);

    const toggleTimer = useCallback(() => {
        if (timeLeft === 0) {
            setTimeLeft(selectedDuration * 60);
            setDistractionCount(0);
            setIsActive(true);
        } else {
            setIsActive(!isActive);
        }
    }, [isActive, timeLeft, selectedDuration]);

    const resetTimer = useCallback(() => {
        console.log('resetTimer function called inside hook');
        setIsActive(false);
        setTimeLeft(selectedDuration * 60);
        setDistractionCount(0);
    }, [selectedDuration]);

    const updateTime = useCallback((minutes) => {
        setIsActive(false);
        setSelectedDuration(minutes);
        setTimeLeft(minutes * 60);
        setDistractionCount(0);
    }, [])

    return {
        timeLeft,
        selectedDuration,
        isActive,
        distractionCount,
        category,
        setCategory,
        toggleTimer,
        resetTimer,
        updateTime
    };
};
