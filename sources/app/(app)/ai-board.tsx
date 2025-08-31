import React, { useState, useEffect } from 'react';
import { View, Text, Platform, RefreshControl, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { t } from '@/text';
import { Typography } from '@/constants/Typography';
import { RoundButton } from '@/components/RoundButton';
import { ItemList } from '@/components/ItemList';
import { ItemGroup } from '@/components/ItemGroup';
import { Item } from '@/components/Item';
import { useSetting } from '@/sync/storage';
import { layout } from '@/components/layout';

const styles = StyleSheet.create((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.colors.divider,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.text,
        ...Typography.default('semiBold'),
    },
    headerSubtitle: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    repositorySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.divider,
    },
    repositoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
        marginRight: 4,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    emptyIcon: {
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    emptyDescription: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    setupButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        minWidth: 120,
    },
    setupButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
}));

// Mock data structure for now
interface AITask {
    id: string;
    number: number;
    title: string;
    status: 'todo' | 'in-progress' | 'done';
    repository: string;
    provider: 'github' | 'gitlab';
    assignees: string[];
    labels: string[];
    createdAt: Date;
    updatedAt: Date;
}

export default function AIBoard() {
    const { theme } = useUnistyles();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [isConfigured, setIsConfigured] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState<string>('');
    const [tasks, setTasks] = useState<AITask[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Check if AI Board is enabled
    const isAIBoardEnabled = useSetting('featureAIBoard');

    useEffect(() => {
        // Check if providers are configured
        checkConfiguration();
    }, []);

    const checkConfiguration = async () => {
        // TODO: Check if GitHub/GitLab tokens are configured
        // For now, simulate no configuration
        setIsConfigured(false);
    };

    const handleSetupProviders = () => {
        router.push('/ai-board/setup');
    };

    const handleRepositorySelect = () => {
        // TODO: Implement repository selection
        console.log('Repository selection not implemented yet');
    };

    const onRefresh = async () => {
        setRefreshing(true);
        // TODO: Sync tasks from configured providers
        setTimeout(() => setRefreshing(false), 1000);
    };

    // Feature flag check
    if (!isAIBoardEnabled) {
        return (
            <View style={styles.container}>
                <View style={[styles.emptyState, { paddingTop: insets.top + 20 }]}>
                    <Ionicons 
                        name="settings-outline" 
                        size={64} 
                        color={theme.colors.textSecondary} 
                        style={styles.emptyIcon}
                    />
                    <Text style={styles.emptyTitle}>
                        {t('aiBoard.featureDisabled')}
                    </Text>
                    <Text style={styles.emptyDescription}>
                        {t('aiBoard.featureDisabledDescription')}
                    </Text>
                    <RoundButton 
                        onPress={() => router.push('/settings/features')}
                        title={t('aiBoard.enableFeature')}
                        style={styles.setupButton}
                    />
                </View>
            </View>
        );
    }

    // Not configured state
    if (!isConfigured) {
        return (
            <View style={styles.container}>
                <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                    <View>
                        <Text style={styles.headerTitle}>
                            🤖 {t('aiBoard.title')}
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            {t('aiBoard.subtitle')}
                        </Text>
                    </View>
                </View>
                
                <View style={styles.emptyState}>
                    <Ionicons 
                        name="git-branch-outline" 
                        size={64} 
                        color={theme.colors.textSecondary} 
                        style={styles.emptyIcon}
                    />
                    <Text style={styles.emptyTitle}>
                        {t('aiBoard.welcomeTitle')}
                    </Text>
                    <Text style={styles.emptyDescription}>
                        {t('aiBoard.welcomeDescription')}
                    </Text>
                    <RoundButton 
                        onPress={handleSetupProviders}
                        title={t('aiBoard.setupProviders')}
                        style={styles.setupButton}
                    />
                </View>
            </View>
        );
    }

    // Configured but no repository selected
    if (!selectedRepo) {
        return (
            <View style={styles.container}>
                <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                    <View>
                        <Text style={styles.headerTitle}>
                            🤖 {t('aiBoard.title')}
                        </Text>
                    </View>
                    <Pressable onPress={() => router.push('/ai-board/setup')}>
                        <Ionicons name="settings-outline" size={20} color={theme.colors.text} />
                    </Pressable>
                </View>
                
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={{ maxWidth: layout.maxWidth, alignSelf: 'center', width: '100%' }}>
                        <ItemList>
                            <ItemGroup 
                                title={t('aiBoard.selectRepository')}
                                footer={t('aiBoard.selectRepositoryFooter')}
                            >
                                <Item
                                    title={t('aiBoard.chooseRepository')}
                                    subtitle={t('aiBoard.noRepositorySelected')}
                                    icon={<Ionicons name="folder-outline" size={29} color="#007AFF" />}
                                    onPress={handleRepositorySelect}
                                />
                            </ItemGroup>
                        </ItemList>
                    </View>
                </ScrollView>
            </View>
        );
    }

    // Main AI Board view (when configured and repository selected)
    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTitle}>
                        🤖 {t('aiBoard.title')}
                    </Text>
                    <Pressable 
                        onPress={handleRepositorySelect}
                        style={styles.repositorySelector}
                    >
                        <Text style={styles.repositoryText}>
                            {selectedRepo}
                        </Text>
                        <Ionicons name="chevron-down" size={16} color={theme.colors.text} />
                    </Pressable>
                </View>
                <Pressable onPress={() => router.push('/ai-board/setup')}>
                    <Ionicons name="settings-outline" size={20} color={theme.colors.text} />
                </Pressable>
            </View>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* TODO: Implement Kanban Board */}
                <View style={styles.emptyState}>
                    <Ionicons 
                        name="grid-outline" 
                        size={64} 
                        color={theme.colors.textSecondary} 
                        style={styles.emptyIcon}
                    />
                    <Text style={styles.emptyTitle}>
                        {t('aiBoard.kanbanComingSoon')}
                    </Text>
                    <Text style={styles.emptyDescription}>
                        {t('aiBoard.kanbanComingSoonDescription')}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const stylesheet = styles;