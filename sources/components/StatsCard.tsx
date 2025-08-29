import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet, useStyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';
import { haptics } from './haptics';

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    onPress?: () => void;
}

export const StatsCard = React.memo(({ 
    title, 
    value, 
    subtitle, 
    icon = 'stats-chart',
    iconColor,
    onPress 
}: StatsCardProps) => {
    const { theme } = useStyles();
    
    const handlePress = () => {
        if (onPress) {
            haptics.impact();
            onPress();
        }
    };
    
    return (
        <Pressable 
            onPress={onPress}
            disabled={!onPress}
            style={({ pressed }) => [
                styles.container,
                pressed && onPress && styles.pressed
            ]}
        >
            <View style={styles.header}>
                <Ionicons 
                    name={icon} 
                    size={24} 
                    color={iconColor || theme.colors.textSecondary} 
                />
                <Text style={styles.title}>{title}</Text>
            </View>
            
            <Text style={styles.value}>{value}</Text>
            
            {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
            )}
        </Pressable>
    );
});

const styles = StyleSheet.create((theme, runtime) => ({
    container: {
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
    pressed: {
        backgroundColor: theme.colors.surfacePressed,
        transform: [{ scale: 0.98 }],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.margins.sm,
    },
    title: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginLeft: theme.margins.xs,
        fontWeight: '500',
    },
    value: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.margins.xs,
    },
    subtitle: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
}));