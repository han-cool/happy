import * as Haptics from 'expo-haptics';

export function hapticsError() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
}

export function hapticsLight() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export const haptics = {
    impact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
    success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
};