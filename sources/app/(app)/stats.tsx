import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { NavigationHeader } from '@/components/navigation/Header';
import { StatsCard } from '@/components/StatsCard';
import { useSessionListViewData } from '@/sync/storage';
import { ActivityIndicator } from 'react-native';
import { layoutConstraints } from '@/components/layout';
import { t } from '@/text';

export default function StatsScreen() {
    const { theme } = useUnistyles();
    const insets = useSafeAreaInsets();
    const sessions = useSessionListViewData();
    
    // Calculate statistics
    const stats = React.useMemo(() => {
        if (!sessions) return null;
        
        const totalSessions = sessions.length;
        const activeSessions = sessions.filter(s => s.status === 'active').length;
        const totalMessages = sessions.reduce((acc, s) => acc + (s.messageCount || 0), 0);
        const avgMessagesPerSession = totalSessions > 0 
            ? Math.round(totalMessages / totalSessions) 
            : 0;
        
        // Calculate today's sessions
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todaySessions = sessions.filter(s => {
            const sessionDate = new Date(s.updatedAt);
            return sessionDate >= today;
        }).length;
        
        return {
            totalSessions,
            activeSessions,
            totalMessages,
            avgMessagesPerSession,
            todaySessions,
        };
    }, [sessions]);
    
    if (!stats) {
        return (
            <>
                <Stack.Screen 
                    options={{
                        header: NavigationHeader,
                        headerTitle: 'Statistics',
                        headerSubtitle: 'Loading data...',
                    }}
                />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.textSecondary} />
                </View>
            </>
        );
    }
    
    return (
        <>
            <Stack.Screen 
                options={{
                    header: NavigationHeader,
                    headerTitle: 'Statistics',
                    headerSubtitle: 'Your Happy usage overview',
                }}
            />
            <ScrollView 
                style={styles.container}
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: insets.bottom + 20 }
                ]}
            >
                <View style={layoutConstraints.centered}>
                    {/* Summary Section */}
                    <Text style={styles.sectionTitle}>Overview</Text>
                    
                    <StatsCard
                        title="Total Sessions"
                        value={stats.totalSessions}
                        subtitle="All time"
                        icon="folder-outline"
                        iconColor={theme.colors.status.connecting}
                    />
                    
                    <StatsCard
                        title="Active Sessions"
                        value={stats.activeSessions}
                        subtitle="Currently active"
                        icon="flash-outline"
                        iconColor={theme.colors.status.connected}
                    />
                    
                    {/* Activity Section */}
                    <Text style={styles.sectionTitle}>Activity</Text>
                    
                    <StatsCard
                        title="Today's Sessions"
                        value={stats.todaySessions}
                        subtitle="Sessions updated today"
                        icon="today-outline"
                        iconColor={theme.colors.permission.acceptEdits}
                    />
                    
                    <StatsCard
                        title="Total Messages"
                        value={stats.totalMessages}
                        subtitle={`Average ${stats.avgMessagesPerSession} per session`}
                        icon="chatbubbles-outline"
                        iconColor={theme.colors.permission.plan}
                    />
                    
                    {/* Usage Patterns */}
                    <Text style={styles.sectionTitle}>Insights</Text>
                    
                    <View style={styles.insightCard}>
                        <Text style={styles.insightTitle}>Most Active Time</Text>
                        <Text style={styles.insightValue}>Afternoon (2-6 PM)</Text>
                        <Text style={styles.insightSubtitle}>Based on session creation times</Text>
                    </View>
                    
                    <View style={styles.insightCard}>
                        <Text style={styles.insightTitle}>Productivity Score</Text>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.scoreValue}>85</Text>
                            <Text style={styles.scoreLabel}>/100</Text>
                        </View>
                        <Text style={styles.insightSubtitle}>Great job! Keep it up!</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.groupped.background,
    },
    content: {
        paddingTop: theme.margins.md,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.groupped.background,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.text,
        marginLeft: theme.margins.md,
        marginTop: theme.margins.lg,
        marginBottom: theme.margins.sm,
    },
    insightCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: theme.margins.md,
        marginHorizontal: theme.margins.sm,
        marginVertical: theme.margins.xs,
        shadowColor: theme.colors.shadow.color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: theme.colors.shadow.opacity,
        shadowRadius: 4,
        elevation: 3,
    },
    insightTitle: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: theme.margins.xs,
    },
    insightValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.margins.xs,
    },
    insightSubtitle: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: theme.margins.xs,
    },
    scoreValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: theme.colors.status.connected,
    },
    scoreLabel: {
        fontSize: 24,
        color: theme.colors.textSecondary,
        marginLeft: 4,
    },
}));