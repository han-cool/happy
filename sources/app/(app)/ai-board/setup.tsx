import React, { useState, useEffect } from 'react';
import { View, Text, Platform, TextInput } from 'react-native';
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
import { layout } from '@/components/layout';
import { Header } from '@/components/navigation/Header';
import { Stack } from 'expo-router';
import { Modal } from '@/modal';

const styles = StyleSheet.create((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    headerContainer: {
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 20,
        paddingVertical: 16,
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
        marginTop: 4,
    },
    section: {
        marginBottom: 24,
    },
    providerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    providerIcon: {
        marginRight: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    providerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
    },
    providerStatus: {
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 'auto',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusConfigured: {
        backgroundColor: theme.colors.status?.connected || '#34C759',
        color: 'white',
    },
    statusNotConfigured: {
        backgroundColor: theme.colors.status?.error || '#FF3B30',
        color: 'white',
    },
    inputContainer: {
        marginTop: 8,
    },
    textInput: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.divider,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        color: theme.colors.text,
        fontFamily: 'JetBrainsMono',
    },
    testButton: {
        marginTop: 12,
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    testButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    instructionText: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        lineHeight: 18,
        marginTop: 8,
    },
    urlText: {
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    saveButtonDisabled: {
        backgroundColor: theme.colors.textSecondary,
        opacity: 0.5,
    },
}));

interface ProviderConfig {
    github: {
        token: string;
        configured: boolean;
    };
    gitlab: {
        token: string;
        domain: string;
        configured: boolean;
    };
}

export default function AIBoardSetup() {
    const { theme } = useUnistyles();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [config, setConfig] = useState<ProviderConfig>({
        github: { token: '', configured: false },
        gitlab: { token: '', domain: '', configured: false }
    });
    const [isTesting, setIsTesting] = useState<{github: boolean, gitlab: boolean}>({
        github: false,
        gitlab: false
    });

    useEffect(() => {
        // TODO: Load existing configuration from secure storage
        loadConfiguration();
    }, []);

    const loadConfiguration = async () => {
        // TODO: Load tokens from secure storage (expo-secure-store)
        // For now, simulate empty configuration
        console.log('Loading provider configuration...');
    };

    const handleGitHubTokenChange = (token: string) => {
        setConfig(prev => ({
            ...prev,
            github: { ...prev.github, token, configured: false }
        }));
    };

    const handleGitLabTokenChange = (token: string) => {
        setConfig(prev => ({
            ...prev,
            gitlab: { ...prev.gitlab, token, configured: false }
        }));
    };

    const handleGitLabDomainChange = (domain: string) => {
        setConfig(prev => ({
            ...prev,
            gitlab: { ...prev.gitlab, domain, configured: false }
        }));
    };

    const testGitHubConnection = async () => {
        if (!config.github.token.trim()) return;
        
        setIsTesting(prev => ({ ...prev, github: true }));
        try {
            // TODO: Test GitHub API connection
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    'Authorization': `token ${config.github.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                },
            });
            
            if (response.ok) {
                const user = await response.json();
                setConfig(prev => ({
                    ...prev,
                    github: { ...prev.github, configured: true }
                }));
                Modal.alert(
                    t('aiBoard.setup.testSuccess'),
                    t('aiBoard.setup.githubConnected', { username: user.login })
                );
            } else {
                throw new Error(`GitHub API returned ${response.status}`);
            }
        } catch (error) {
            console.error('GitHub connection test failed:', error);
            Modal.alert(
                t('aiBoard.setup.testFailed'),
                t('aiBoard.setup.githubConnectionError')
            );
        } finally {
            setIsTesting(prev => ({ ...prev, github: false }));
        }
    };

    const testGitLabConnection = async () => {
        if (!config.gitlab.token.trim()) return;
        
        const domain = config.gitlab.domain.trim() || 'gitlab.com';
        const apiUrl = `https://${domain}/api/v4/user`;
        
        setIsTesting(prev => ({ ...prev, gitlab: true }));
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${config.gitlab.token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const user = await response.json();
                setConfig(prev => ({
                    ...prev,
                    gitlab: { ...prev.gitlab, configured: true }
                }));
                Modal.alert(
                    t('aiBoard.setup.testSuccess'),
                    t('aiBoard.setup.gitlabConnected', { username: user.username, domain })
                );
            } else {
                throw new Error(`GitLab API returned ${response.status}`);
            }
        } catch (error) {
            console.error('GitLab connection test failed:', error);
            Modal.alert(
                t('aiBoard.setup.testFailed'),
                t('aiBoard.setup.gitlabConnectionError', { domain })
            );
        } finally {
            setIsTesting(prev => ({ ...prev, gitlab: false }));
        }
    };

    const saveConfiguration = async () => {
        try {
            // TODO: Save tokens to secure storage (expo-secure-store)
            console.log('Saving provider configuration...');
            
            // Navigate back to AI Board
            router.back();
        } catch (error) {
            console.error('Failed to save configuration:', error);
            Modal.alert(
                t('common.error'),
                t('aiBoard.setup.saveError')
            );
        }
    };

    const hasValidConfiguration = () => {
        return config.github.configured || config.gitlab.configured;
    };

    return (
        <>
            <Stack.Screen
                options={{
                    header: () => <Header title={t('aiBoard.setup.title')} />,
                }}
            />
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ maxWidth: layout.maxWidth, alignSelf: 'center', width: '100%' }}>
                        <ItemList>
                            {/* GitHub Configuration */}
                            <ItemGroup 
                                title={
                                    <View style={styles.providerHeader}>
                                        <View style={styles.providerIcon}>
                                            <Ionicons name="logo-github" size={20} color="#333" />
                                        </View>
                                        <Text style={styles.providerTitle}>GitHub</Text>
                                        <Text style={[
                                            styles.providerStatus,
                                            config.github.configured ? styles.statusConfigured : styles.statusNotConfigured
                                        ]}>
                                            {config.github.configured ? t('aiBoard.setup.configured') : t('aiBoard.setup.notConfigured')}
                                        </Text>
                                    </View>
                                }
                                footer={t('aiBoard.setup.githubInstructions')}
                            >
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={t('aiBoard.setup.githubTokenPlaceholder')}
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={config.github.token}
                                        onChangeText={handleGitHubTokenChange}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                    />
                                    <Text style={styles.instructionText}>
                                        {t('aiBoard.setup.githubTokenInstructions')}{' '}
                                        <Text style={styles.urlText}>
                                            github.com/settings/tokens
                                        </Text>
                                    </Text>
                                    <Pressable
                                        style={styles.testButton}
                                        onPress={testGitHubConnection}
                                        disabled={!config.github.token.trim() || isTesting.github}
                                    >
                                        <Text style={styles.testButtonText}>
                                            {isTesting.github ? t('aiBoard.setup.testing') : t('aiBoard.setup.testConnection')}
                                        </Text>
                                    </Pressable>
                                </View>
                            </ItemGroup>

                            {/* GitLab Configuration */}
                            <ItemGroup 
                                title={
                                    <View style={styles.providerHeader}>
                                        <View style={styles.providerIcon}>
                                            <Ionicons name="logo-gitlab" size={20} color="#FC6D26" />
                                        </View>
                                        <Text style={styles.providerTitle}>GitLab</Text>
                                        <Text style={[
                                            styles.providerStatus,
                                            config.gitlab.configured ? styles.statusConfigured : styles.statusNotConfigured
                                        ]}>
                                            {config.gitlab.configured ? t('aiBoard.setup.configured') : t('aiBoard.setup.notConfigured')}
                                        </Text>
                                    </View>
                                }
                                footer={t('aiBoard.setup.gitlabInstructions')}
                            >
                                <View style={styles.inputContainer}>
                                    <Text style={[styles.instructionText, { marginBottom: 8 }]}>
                                        {t('aiBoard.setup.gitlabDomainLabel')}
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={t('aiBoard.setup.gitlabDomainPlaceholder')}
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={config.gitlab.domain}
                                        onChangeText={handleGitLabDomainChange}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    <Text style={[styles.instructionText, { marginTop: 16, marginBottom: 8 }]}>
                                        {t('aiBoard.setup.gitlabTokenLabel')}
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={t('aiBoard.setup.gitlabTokenPlaceholder')}
                                        placeholderTextColor={theme.colors.textSecondary}
                                        value={config.gitlab.token}
                                        onChangeText={handleGitLabTokenChange}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                    />
                                    <Text style={styles.instructionText}>
                                        {t('aiBoard.setup.gitlabTokenInstructions')}{' '}
                                        <Text style={styles.urlText}>
                                            {config.gitlab.domain || 'gitlab.com'}/-/profile/personal_access_tokens
                                        </Text>
                                    </Text>
                                    <Pressable
                                        style={styles.testButton}
                                        onPress={testGitLabConnection}
                                        disabled={!config.gitlab.token.trim() || isTesting.gitlab}
                                    >
                                        <Text style={styles.testButtonText}>
                                            {isTesting.gitlab ? t('aiBoard.setup.testing') : t('aiBoard.setup.testConnection')}
                                        </Text>
                                    </Pressable>
                                </View>
                            </ItemGroup>
                        </ItemList>
                    </View>
                </ScrollView>

                <RoundButton
                    style={[
                        styles.saveButton,
                        !hasValidConfiguration() && styles.saveButtonDisabled
                    ]}
                    onPress={saveConfiguration}
                    disabled={!hasValidConfiguration()}
                    title={t('aiBoard.setup.saveConfiguration')}
                />
            </View>
        </>
    );
}

const stylesheet = styles;