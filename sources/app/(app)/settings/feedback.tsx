import { useState } from 'react';
import { View, TextInput, Platform, Alert } from 'react-native';
import { Text } from '@/components/StyledText';
import { ItemList } from '@/components/ItemList';
import { ItemGroup } from '@/components/ItemGroup';
import { Item } from '@/components/Item';
import { useUnistyles } from 'react-native-unistyles';
import { t } from '@/text';
import { Ionicons } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { Modal } from '@/modal';
import Constants from 'expo-constants';
import { layout } from '@/components/layout';

// Environment-based email configuration
const getFeedbackEmail = () => {
    const env = process.env.APP_ENV || 'development';
    const emails = {
        development: 'hannn@smartosc.com',
        preview: 'hannn@smartosc.com',
        production: 'feedback@d3ai.com' // Change this for production
    };
    return emails[env as keyof typeof emails] || emails.development;
};

const feedbackCategories = [
    { id: 'issue', title: t('feedback.categories.issue'), icon: 'bug-outline', color: '#FF3B30' },
    { id: 'improve', title: t('feedback.categories.improve'), icon: 'bulb-outline', color: '#FF9500' },
    { id: 'feature', title: t('feedback.categories.feature'), icon: 'star-outline', color: '#34C759' },
    { id: 'other', title: t('feedback.categories.other'), icon: 'chatbubble-outline', color: '#007AFF' },
];

export default function FeedbackScreen() {
    const { theme } = useUnistyles();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSendFeedback = async () => {
        if (!selectedCategory) {
            Modal.alert(t('feedback.selectCategory'), t('feedback.selectCategoryMessage'));
            return;
        }

        if (!message.trim()) {
            Modal.alert(t('feedback.enterMessage'), t('feedback.enterMessageMessage'));
            return;
        }

        setIsSubmitting(true);

        try {
            const isAvailable = await MailComposer.isAvailableAsync();
            
            if (!isAvailable) {
                Modal.alert(t('feedback.mailNotAvailable'), t('feedback.mailNotAvailableMessage'));
                setIsSubmitting(false);
                return;
            }

            const appVersion = Constants.expoConfig?.version || '1.0.0';
            const categoryTitle = feedbackCategories.find(cat => cat.id === selectedCategory)?.title || selectedCategory;
            
            const emailBody = `${t('feedback.category')}: ${categoryTitle}\n\n${t('feedback.message')}:\n${message}\n\n---\n${t('feedback.appVersion')}: ${appVersion}\n${t('feedback.platform')}: ${Platform.OS}`;

            await MailComposer.composeAsync({
                recipients: [getFeedbackEmail()],
                subject: `[D3 AI] ${categoryTitle} ${t('feedback.feedbackSubject')}`,
                body: emailBody
            });

            // Reset form after successful composition
            setSelectedCategory('');
            setMessage('');
            
            Modal.alert(t('feedback.thankYou'), t('feedback.feedbackSentMessage'));
            
        } catch (error) {
            console.error('Failed to send feedback:', error);
            Modal.alert(t('feedback.errorSending'), t('feedback.errorSendingMessage'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ItemList style={{ paddingTop: 0 }}>
            <View style={{ maxWidth: layout.maxWidth, alignSelf: 'center', width: '100%' }}>
                {/* Category Selection */}
                <ItemGroup 
                    title={t('feedback.selectCategory')}
                    footer={t('feedback.selectCategoryFooter')}
                >
                    {feedbackCategories.map((category) => (
                        <Item
                            key={category.id}
                            title={category.title}
                            icon={<Ionicons name={category.icon as any} size={29} color={category.color} />}
                            rightElement={
                                selectedCategory === category.id ? (
                                    <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
                                ) : (
                                    <Ionicons name="radio-button-off" size={24} color={theme.colors.textSecondary} />
                                )
                            }
                            onPress={() => setSelectedCategory(category.id)}
                            showChevron={false}
                        />
                    ))}
                </ItemGroup>

                {/* Message Input */}
                <ItemGroup 
                    title={t('feedback.message')}
                    footer={t('feedback.messageFooter')}
                >
                    <View style={{ 
                        backgroundColor: theme.colors.surface, 
                        borderRadius: 8, 
                        margin: 16, 
                        padding: 16 
                    }}>
                        <TextInput
                            style={{
                                minHeight: 120,
                                fontSize: 16,
                                color: theme.colors.text,
                                textAlignVertical: 'top'
                            }}
                            multiline
                            placeholder={t('feedback.messagePlaceholder')}
                            placeholderTextColor={theme.colors.textSecondary}
                            value={message}
                            onChangeText={setMessage}
                            maxLength={2000}
                        />
                        <Text style={{ 
                            fontSize: 12, 
                            color: theme.colors.textSecondary, 
                            textAlign: 'right', 
                            marginTop: 8 
                        }}>
                            {message.length}/2000
                        </Text>
                    </View>
                </ItemGroup>

                {/* Send Button */}
                <ItemGroup>
                    <Item
                        title={t('feedback.sendFeedback')}
                        subtitle={!selectedCategory || !message.trim() ? t('feedback.completeForm') : t('feedback.readyToSend')}
                        icon={<Ionicons name="send-outline" size={29} color="#007AFF" />}
                        onPress={handleSendFeedback}
                        loading={isSubmitting}
                        disabled={!selectedCategory || !message.trim()}
                        showChevron={false}
                    />
                </ItemGroup>
            </View>
        </ItemList>
    );
}