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