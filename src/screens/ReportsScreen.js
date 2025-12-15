import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getSessions } from '../hooks/useStorage';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get("window").width;

export default function ReportsScreen() {
    const [stats, setStats] = useState({
        todayDuration: 0,
        totalDuration: 0,
        totalDistractions: 0,
        last7Days: { labels: [], datasets: [{ data: [0] }] },
        categoryData: []
    });
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadData().then(() => setRefreshing(false));
    }, []);

    const loadData = async () => {
        const sessions = await getSessions();
        processStats(sessions);
    };

    const processStats = (sessions) => {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        let todayDur = 0;
        let totalDur = 0;
        let totalDist = 0;

        const catMap = {};
        const dayMap = {};

        // Initialize last 7 days keys
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dStr = d.toISOString().split('T')[0];
            dayMap[dStr] = 0;
        }

        sessions.forEach(s => {
            const sDate = s.date.split('T')[0];

            totalDur += s.duration;
            totalDist += s.distractionCount || 0;

            if (sDate === todayStr) {
                todayDur += s.duration;
            }

            if (!catMap[s.category]) catMap[s.category] = 0;
            catMap[s.category] += s.duration;

            if (dayMap.hasOwnProperty(sDate)) {
                dayMap[sDate] += s.duration / 60; // Store as minutes
            }
        });

        const barLabels = Object.keys(dayMap).map(d => {
            const parts = d.split('-');
            return `${parts[1]}/${parts[2]}`;
        });
        const barData = Object.values(dayMap);

        const pieData = Object.keys(catMap).map((cat, index) => ({
            name: cat,
            population: Math.round(catMap[cat] / 60), // Minutes
            color: getColor(index),
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        })).filter(d => d.population > 0);

        // Fallback for empty pie chart
        if (pieData.length === 0) {
            pieData.push({ name: 'Veri Yok', population: 1, color: '#dfe6e9', legendFontColor: '#7F7F7F', legendFontSize: 12 });
        }

        setStats({
            todayDuration: todayDur,
            totalDuration: totalDur,
            totalDistractions: totalDist,
            last7Days: {
                labels: barLabels,
                datasets: [{ data: barData }]
            },
            categoryData: pieData
        });
    };

    const getColor = (index) => {
        const colors = ['#6c5ce7', '#00b894', '#0984e3', '#e17055', '#fdcb6e', '#d63031'];
        return colors[index % colors.length];
    }

    const formatDuration = (sec) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        return h > 0 ? `${h}s ${m}dk` : `${m}dk`;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Raporlar</Text>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

                {/* General Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{formatDuration(stats.todayDuration)}</Text>
                        <Text style={styles.statLabel}>Bugün</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{formatDuration(stats.totalDuration)}</Text>
                        <Text style={styles.statLabel}>Toplam</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statValue, { color: '#d63031' }]}>{stats.totalDistractions}</Text>
                        <Text style={styles.statLabel}>Dikkat Dağ.</Text>
                    </View>
                </View>

                {/* Bar Chart */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Son 7 Gün (Dakika)</Text>
                    <BarChart
                        data={stats.last7Days}
                        width={screenWidth - 40}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: { borderRadius: 16 }
                        }}
                        style={{ marginVertical: 8, borderRadius: 16 }}
                        verticalLabelRotation={0}
                    />
                </View>

                {/* Pie Chart */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Kategori Dağılımı</Text>
                    <PieChart
                        data={stats.categoryData}
                        width={screenWidth - 40}
                        height={220}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        absolute
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fdfdfd' },
    header: { fontSize: 34, fontWeight: '800', padding: 25, color: '#2d3436', paddingTop: 40 },
    scrollContent: { paddingHorizontal: 25, paddingBottom: 100 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, gap: 12 },
    statCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        flex: 1,
        alignItems: 'center',
        shadowColor: '#6c5ce7',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4
    },
    statValue: { fontSize: 20, fontWeight: '700', color: '#2d3436', marginBottom: 6 },
    statLabel: { fontSize: 13, color: '#b2bec3', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
    chartContainer: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        marginBottom: 25,
        alignItems: 'center',
        shadowColor: '#6c5ce7',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 3
    },
    chartTitle: { fontSize: 18, fontWeight: '700', marginBottom: 20, color: '#2d3436', alignSelf: 'flex-start', marginLeft: 10 }
});
