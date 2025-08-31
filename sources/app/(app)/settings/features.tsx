import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item } from '@/components/Item';
import { ItemGroup } from '@/components/ItemGroup';
import { ItemList } from '@/components/ItemList';
import { useSettingMutable, useLocalSettingMutable } from '@/sync/storage';
import { Switch } from '@/components/Switch';
import { t } from '@/text';

export default function FeaturesSettingsScreen() {
    const [experiments, setExperiments] = useSettingMutable('experiments');
    const [showHomeStats, setShowHomeStats] = useSettingMutable('showHomeStats');
    const [enableNotifications, setEnableNotifications] = useSettingMutable('enableNotifications');
    const [commandPaletteEnabled, setCommandPaletteEnabled] = useLocalSettingMutable('commandPaletteEnabled');
    
    // Support feature flags
    const [featureSupportUs, setFeatureSupportUs] = useSettingMutable('featureSupportUs');
    const [featureBuyMeCoffee, setFeatureBuyMeCoffee] = useSettingMutable('featureBuyMeCoffee');
    const [featureSendFeedback, setFeatureSendFeedback] = useSettingMutable('featureSendFeedback');
    const [featureAIBoard, setFeatureAIBoard] = useSettingMutable('featureAIBoard');
    
    return (
        <ItemList style={{ paddingTop: 0 }}>
            {/* Experimental Features */}
            <ItemGroup 
                title={t('settingsFeatures.experiments')}
                footer={t('settingsFeatures.experimentsDescription')}
            >
                <Item
                    title={t('settingsFeatures.experimentalFeatures')}
                    subtitle={experiments ? t('settingsFeatures.experimentalFeaturesEnabled') : t('settingsFeatures.experimentalFeaturesDisabled')}
                    icon={<Ionicons name="flask-outline" size={29} color="#5856D6" />}
                    rightElement={
                        <Switch
                            value={experiments}
                            onValueChange={setExperiments}
                        />
                    }
                    showChevron={false}
                />
            </ItemGroup>

            {/* Display Features */}
            <ItemGroup 
                title="Display Options"
                footer="Customize what information is shown in the app"
            >
                <Item
                    title="Home Screen Statistics"
                    subtitle={showHomeStats ? "Show session stats on home" : "Statistics hidden"}
                    icon={<Ionicons name="bar-chart-outline" size={29} color="#34C759" />}
                    rightElement={
                        <Switch
                            value={showHomeStats}
                            onValueChange={setShowHomeStats}
                        />
                    }
                    showChevron={false}
                />
            </ItemGroup>

            {/* Notification Settings */}
            <ItemGroup 
                title="Notifications"
                footer="Control when and how you receive notifications"
            >
                <Item
                    title="Push Notifications"
                    subtitle={enableNotifications ? "Notifications enabled" : "Notifications disabled"}
                    icon={<Ionicons name="notifications-outline" size={29} color="#FF9500" />}
                    rightElement={
                        <Switch
                            value={enableNotifications}
                            onValueChange={setEnableNotifications}
                        />
                    }
                    showChevron={false}
                />
            </ItemGroup>

            {/* Support Features */}
            <ItemGroup 
                title={t('settingsFeatures.supportFeatures')}
                footer={t('settingsFeatures.supportFeaturesDescription')}
            >
                <Item
                    title={t('settingsFeatures.supportUs')}
                    subtitle={featureSupportUs ? t('settingsFeatures.supportUsEnabled') : t('settingsFeatures.supportUsDisabled')}
                    icon={<Ionicons name="heart-outline" size={29} color="#FF3B30" />}
                    rightElement={
                        <Switch
                            value={featureSupportUs}
                            onValueChange={setFeatureSupportUs}
                        />
                    }
                    showChevron={false}
                />
                <Item
                    title={t('settingsFeatures.buyMeCoffee')}
                    subtitle={featureBuyMeCoffee ? t('settingsFeatures.buyMeCoffeeEnabled') : t('settingsFeatures.buyMeCoffeeDisabled')}
                    icon={<Ionicons name="cafe-outline" size={29} color="#8B4513" />}
                    rightElement={
                        <Switch
                            value={featureBuyMeCoffee}
                            onValueChange={setFeatureBuyMeCoffee}
                        />
                    }
                    showChevron={false}
                />
                <Item
                    title={t('settingsFeatures.sendFeedback')}
                    subtitle={featureSendFeedback ? t('settingsFeatures.sendFeedbackEnabled') : t('settingsFeatures.sendFeedbackDisabled')}
                    icon={<Ionicons name="chatbubble-outline" size={29} color="#007AFF" />}
                    rightElement={
                        <Switch
                            value={featureSendFeedback}
                            onValueChange={setFeatureSendFeedback}
                        />
                    }
                    showChevron={false}
                />
            </ItemGroup>

            {/* AI & Automation Features */}
            <ItemGroup 
                title={t('settingsFeatures.aiFeatures')}
                footer={t('settingsFeatures.aiFeaturesDescription')}
            >
                <Item
                    title={t('settingsFeatures.aiBoard')}
                    subtitle={featureAIBoard ? t('settingsFeatures.aiBoardEnabled') : t('settingsFeatures.aiBoardDisabled')}
                    icon={<Ionicons name="grid-outline" size={29} color="#5856D6" />}
                    rightElement={
                        <Switch
                            value={featureAIBoard}
                            onValueChange={setFeatureAIBoard}
                        />
                    }
                    showChevron={false}
                />
            </ItemGroup>

            {/* Web-only Features */}
            {Platform.OS === 'web' && (
                <ItemGroup 
                    title={t('settingsFeatures.webFeatures')}
                    footer={t('settingsFeatures.webFeaturesDescription')}
                >
                    <Item
                        title={t('settingsFeatures.commandPalette')}
                        subtitle={commandPaletteEnabled ? t('settingsFeatures.commandPaletteEnabled') : t('settingsFeatures.commandPaletteDisabled')}
                        icon={<Ionicons name="keypad-outline" size={29} color="#007AFF" />}
                        rightElement={
                            <Switch
                                value={commandPaletteEnabled}
                                onValueChange={setCommandPaletteEnabled}
                            />
                        }
                        showChevron={false}
                    />
                </ItemGroup>
            )}
        </ItemList>
    );
}