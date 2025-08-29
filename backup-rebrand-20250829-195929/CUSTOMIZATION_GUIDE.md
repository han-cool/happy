# Happy Mobile App Customization Guide

## Quick Start

```bash
# Install dependencies
yarn install

# Start development
yarn start

# Run on iOS
yarn ios

# Run on Android  
yarn android

# Type check
yarn typecheck
```

## Customization Examples

### 1. 🎨 Custom Theme Colors

Modify `sources/theme.ts` to change the app's color scheme:

```typescript
// Example: Purple/Indigo theme
export const lightTheme = {
    colors: {
        textLink: '#6366F1',  // Indigo links
        status: {
            connected: '#10B981',  // Emerald green
            connecting: '#6366F1',  // Indigo
        },
        button: {
            primary: {
                background: '#6366F1',  // Indigo buttons
            },
        },
        fab: {
            background: '#6366F1',
            backgroundPressed: '#4F46E5',
        },
    }
}
```

### 2. 🌍 Add New Language

Created Spanish translation at `sources/text/translations/es.ts` and updated `sources/text/index.ts`:

```typescript
// Add to supported languages
export type SupportedLanguage = 'en' | 'ru' | 'pl' | 'es';

// Import translation
import { es } from './translations/es';

// Add to translations object
const translations = { en, ru, pl, es };
```

### 3. 🧩 Custom Components

Created `sources/components/StatsCard.tsx` - a reusable statistics card component with:
- Icon support
- Press interactions  
- Theme integration
- Responsive layout

### 4. ⚙️ Feature Toggles

Added new settings in `sources/sync/settings.ts`:
- `showHomeStats` - Display statistics on home screen
- `enableNotifications` - Control push notifications

Integrated into settings UI at `sources/app/(app)/settings/features.tsx`

### 5. 📱 Custom Screen

Created statistics dashboard at `sources/app/(app)/stats.tsx` with:
- Session analytics
- Activity tracking
- Productivity insights
- Navigation integration

### 6. 🔗 Component Integration

Modified home screen (`sources/app/(app)/index.tsx`) to:
- Import StatsCard component
- Check feature toggle
- Display horizontal stats carousel when enabled
- Link to full statistics screen

## File Structure

```
sources/
├── app/(app)/           # App screens
│   ├── index.tsx        # Home screen
│   ├── stats.tsx        # New stats screen
│   └── settings/        # Settings screens
├── components/          # Reusable components
│   └── StatsCard.tsx    # Custom stats card
├── sync/               
│   └── settings.ts      # App settings/toggles
├── text/               
│   └── translations/    # Language files
│       └── es.ts        # Spanish translation
└── theme.ts             # Theme configuration
```

## Key Customization Points

### Visual Customization
- **Theme**: `sources/theme.ts` - Colors, typography
- **Unistyles**: `sources/unistyles.ts` - Breakpoints, theme setup
- **Assets**: `sources/assets/images/` - Icons, logos, splash screens

### Functional Customization
- **Settings**: `sources/sync/settings.ts` - Feature toggles
- **Navigation**: `sources/app/(app)/_layout.tsx` - Screen routing
- **Components**: `sources/components/` - UI building blocks

### Content Customization
- **Translations**: `sources/text/` - All user-facing strings
- **Changelog**: `CHANGELOG.md` - Version history

## Best Practices

1. **Always use TypeScript** - Run `yarn typecheck` frequently
2. **Use translation keys** - Never hardcode strings, use `t('key')`
3. **Follow theme system** - Use theme colors, not hardcoded values
4. **Test on both platforms** - iOS and Android may differ
5. **Use Unistyles** - For responsive, themed styling
6. **Component reusability** - Create generic, configurable components

## Testing Your Changes

```bash
# Type checking
yarn typecheck

# iOS testing
yarn ios

# Android testing
yarn android

# Web testing
yarn web

# Deploy preview update
yarn ota
```

## Common Customizations

### Change App Name
Edit `app.config.js`:
```javascript
const name = {
    development: "YourApp (dev)",
    preview: "YourApp (preview)",
    production: "YourApp"
}
```

### Change Bundle ID
Edit `app.config.js`:
```javascript
const bundleId = {
    development: "com.yourcompany.app.dev",
    preview: "com.yourcompany.app.preview",
    production: "com.yourcompany.app"
}
```

### Custom Fonts
1. Add fonts to `sources/assets/fonts/`
2. Load in app using `expo-font`
3. Update Typography constants

### Custom Icons
1. Replace files in `sources/assets/images/`
2. Update icon references in components
3. Generate adaptive icons for Android

## Advanced Topics

### State Management
- Auth state: `sources/auth/AuthContext.tsx`
- Settings: `sources/sync/storage.ts`
- Global state: Consider adding Zustand stores

### Encryption
- E2E encryption: `sources/sync/apiEncryption.ts`
- Session keys: `sources/sync/apiSessionEncryption.ts`

### Real-time Features
- Voice assistant: `sources/realtime/`
- WebSocket sync: `sources/sync/apiSocket.ts`

### Platform-Specific Code
- Use `.ios.tsx` and `.android.tsx` extensions
- Use `.native.ts` vs `.web.ts` for platform logic
- Use Platform.select() for inline differences

## Deployment

### OTA Updates
```bash
# Preview environment
yarn ota

# Production
yarn ota:production
```

### Native Builds
```bash
# Generate native projects
yarn prebuild

# Submit to App Store
yarn submit
```

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Unistyles](https://unistyl.es)
- [React Navigation](https://reactnavigation.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

- Report issues: [GitHub Issues](https://github.com/slopus/happy/issues)
- Documentation: Check `CLAUDE.md` for development guidelines
- Community: Join discussions on GitHub