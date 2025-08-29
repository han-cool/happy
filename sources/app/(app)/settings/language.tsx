import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Item } from '@/components/Item';
import { ItemGroup } from '@/components/ItemGroup';
import { ItemList } from '@/components/ItemList';
import { useSettingMutable } from '@/sync/storage';
import { useUnistyles } from 'react-native-unistyles';
import { t } from '@/text';
import { Modal } from '@/modal';
import { useUpdates } from '@/hooks/useUpdates';
import * as Localization from 'expo-localization';

type LanguageOption = 'auto' | 'en' | 'ru' | 'pl' | 'es' | 'vi';

interface LanguageItem {
    key: LanguageOption;
    title: string;
    subtitle?: string;
}

export default function LanguageSettingsScreen() {
    const { theme } = useUnistyles();
    const [preferredLanguage, setPreferredLanguage] = useSettingMutable('preferredLanguage');
    const { reloadApp } = useUpdates();

    // Get device locale for automatic detection
    const deviceLocale = Localization.getLocales()?.[0]?.languageTag ?? 'en-US';
    const deviceLanguage = deviceLocale.split('-')[0].toLowerCase();
    const detectedLanguageName = deviceLanguage === 'ru' ? t('settingsLanguage.languages.ru') : 
                                 deviceLanguage === 'pl' ? t('settingsLanguage.languages.pl') :
                                 deviceLanguage === 'es' ? t('settingsLanguage.languages.es') :
                                 deviceLanguage === 'vi' ? t('settingsLanguage.languages.vi') : 
                                 t('settingsLanguage.languages.en');

    // Current selection
    const currentSelection: LanguageOption = preferredLanguage === null ? 'auto' : 
                                           preferredLanguage === 'en' ? 'en' :
                                           preferredLanguage === 'ru' ? 'ru' :
                                           preferredLanguage === 'pl' ? 'pl' :
                                           preferredLanguage === 'es' ? 'es' :
                                           preferredLanguage === 'vi' ? 'vi' : 'auto';

    // Language options
    const languageOptions: LanguageItem[] = [
        {
            key: 'auto',
            title: t('settingsLanguage.automatic'),
            subtitle: `${t('settingsLanguage.automaticSubtitle')} (${detectedLanguageName})`
        },
        {
            key: 'en',
            title: t('settingsLanguage.languages.en')
        },
        {
            key: 'ru',
            title: t('settingsLanguage.languages.ru')
        },
        {
            key: 'pl',
            title: t('settingsLanguage.languages.pl')
        },
        {
            key: 'es',
            title: t('settingsLanguage.languages.es')
        },
        {
            key: 'vi',
            title: t('settingsLanguage.languages.vi')
        }
    ];

    const handleLanguageChange = async (newLanguage: LanguageOption) => {
        if (newLanguage === currentSelection) {
            return; // No change
        }

        // Show confirmation modal
        const confirmed = await Modal.confirm(
            t('settingsLanguage.needsRestart'),
            t('settingsLanguage.needsRestartMessage')
        );

        if (confirmed) {
            // Update the preference
            const newPreference = newLanguage === 'auto' ? null : newLanguage;
            setPreferredLanguage(newPreference);

            // Small delay to ensure setting is saved
            setTimeout(() => {
                reloadApp();
            }, 100);
        }
    };

    return (
        <ItemList style={{ paddingTop: 0 }}>
            <ItemGroup 
                title={t('settingsLanguage.currentLanguage')} 
                footer={t('settingsLanguage.description')}
            >
                {languageOptions.map((option) => (
                    <Item
                        key={option.key}
                        title={option.title}
                        subtitle={option.subtitle}
                        icon={<Ionicons 
                            name="language-outline" 
                            size={29} 
                            color="#007AFF" 
                        />}
                        rightElement={
                            currentSelection === option.key ? (
                                <Ionicons 
                                    name="checkmark" 
                                    size={20} 
                                    color="#007AFF" 
                                />
                            ) : null
                        }
                        onPress={() => handleLanguageChange(option.key)}
                        showChevron={false}
                    />
                ))}
            </ItemGroup>
        </ItemList>
    );
}