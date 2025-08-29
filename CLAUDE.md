# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `yarn start` - Start the Expo development server
- `yarn start:local-server` - Start with local server debugging enabled (sets DEBUG=1 and local server URL)
- `yarn ios` - Run the app on iOS simulator
- `yarn ios:connected-device` - Run on connected iOS device (auto-detects first available paired device)
- `yarn android` - Run the app on Android emulator  
- `yarn web` - Run the app in web browser
- `yarn prebuild` - Generate native iOS and Android directories (removes existing android/ios directories first)
- `yarn typecheck` - Run TypeScript type checking after all changes
- `yarn generate-theme` - Generate Material You theme colors from base color (#18171C)

### Testing
- `yarn test` - Run tests using Vitest (includes TypeScript and Node.js tests)
- Tests are located in `sources/**/*.{spec,test}.ts` files
- Test configuration is in `vitest.config.ts`

### Production
- `yarn ota` - Deploy OTA updates to preview branch (includes changelog parsing and typecheck)
- `yarn ota:production` - Deploy OTA updates to production branch (includes changelog parsing and typecheck)
- `yarn submit` - Submit iOS build to App Store Connect

## Changelog Management

The app includes an in-app changelog feature that displays version history to users. When making changes:

### Adding Changelog Entries

1. **Always update the latest version** in `/CHANGELOG.md` when adding new features or fixes
2. **Format**: Each version follows this structure:
   ```markdown
   ## Version [NUMBER] - YYYY-MM-DD
   - Brief description of change/feature/fix
   - Another change description
   - Keep descriptions user-friendly and concise
   ```

3. **Version numbering**: Increment the version number for each release (1, 2, 3, etc.)
4. **Date format**: Use ISO date format (YYYY-MM-DD)

### Regenerating Changelog Data

After updating CHANGELOG.md, run:
```bash
npx tsx sources/scripts/parseChangelog.ts
```

This generates `sources/changelog/changelog.json` which is used by the app.

### Best Practices

- Write changelog entries from the user's perspective
- Start each entry with a verb (Added, Fixed, Improved, Updated, Removed)
- Group related changes together
- Keep descriptions concise but informative
- Focus on what changed, not technical implementation details
- The changelog is automatically parsed during `yarn ota` and `yarn ota:production`
- Always improve and expand basic changelog descriptions to be more user-friendly and informative
- Include a brief summary paragraph before bullet points for each version explaining the theme of the update

### Example Entry

```markdown
## Version 4 - 2025-01-26
- Added dark mode support across all screens
- Fixed navigation issues on tablet devices  
- Improved app startup performance by 30%
- Updated authentication flow for better security
- Removed deprecated API endpoints
```

## Architecture Overview

### Core Technology Stack
- **React Native 0.79.5** with **Expo SDK 53**
- **TypeScript 5.8** with strict mode enabled
- **React Native Unistyles v3** for cross-platform styling with themes and breakpoints
- **Expo Router v5** for file-based routing
- **Socket.io v4** for real-time WebSocket communication
- **tweetnacl** and **react-native-libsodium** for end-to-end encryption
- **React Native Reanimated v4** for animations
- **Vitest** for unit testing
- **Zustand** for state management

### Project Structure
```
sources/
├── app/              # Expo Router screens (file-based routing)
│   ├── (app)/        # Main app screens with auth guard
│   ├── dev/          # Development tools and debug screens
│   ├── session/      # Session detail screens
│   └── settings/     # Settings and preferences screens
├── auth/             # Authentication logic (QR code based)
├── changelog/        # Changelog parsing and display logic
├── components/       # Reusable UI components
│   └── CommandPalette/ # Global command palette system
├── modal/            # Custom modal system (replaces React Native Alert)
├── scripts/          # Build-time scripts (changelog parser, etc.)
├── sync/             # Real-time sync engine with encryption
├── text/             # i18n translations (en, pl, ru)
├── theme/            # Unistyles theme configuration
├── trash/            # Temporary scripts and experiments
├── utils/            # Utility functions
└── voice/            # Voice assistant integration
```

### Key Architectural Patterns

1. **Authentication Flow**: QR code-based authentication using expo-camera with challenge-response mechanism
   - Secret key stored in expo-secure-store for security
   - Backup/restore functionality for account migration
   - GitHub OAuth integration for profile sync

2. **Data Synchronization**: WebSocket-based real-time sync with automatic reconnection
   - Encrypted message passing via `apiTypes.ts` schemas
   - Session-based encryption with unique keys per session
   - Automatic persistence to MMKV storage for offline support

3. **Encryption**: Multi-layer encryption strategy
   - End-to-end encryption using tweetnacl for messages
   - Session keys for temporary encryption
   - GitHub token encryption for backend storage

4. **State Management**: Hybrid approach
   - React Context for auth state (`AuthContext.tsx`)
   - Zustand for global app state
   - Local component state for UI interactions

5. **Platform-Specific Code**: File extensions for platform targeting
   - `.native.ts` for mobile-specific implementations
   - `.web.tsx` for web-specific components
   - `.ios.tsx` / `.android.tsx` for OS-specific features

### Development Guidelines

- Use **4 spaces** for indentation
- Use **yarn** instead of npm for package management
- Path alias `@/*` maps to `./sources/*`
- TypeScript strict mode is enabled - ensure all code is properly typed
- Follow existing component patterns when creating new UI components
- Real-time sync operations are handled through SyncSocket and SyncSession classes
- Store all temporary scripts and any test outside of unit tests in sources/trash folder
- When setting screen parameters ALWAYS set them in _layout.tsx if possible this avoids layout shifts
- **Never use Alert module from React Native, always use @sources/modal/index.ts instead**
- **Always apply layout width constraints** from `@/components/layout` to full-screen ScrollViews and content containers for responsive design across device sizes
- Always run `yarn typecheck` after all changes to ensure type safety

### Internationalization (i18n) Guidelines

**CRITICAL: Always use the `t(...)` function for ALL user-visible strings**

#### Basic Usage
```typescript
import { t } from '@/text';

// ✅ Simple constants
t('common.cancel')              // "Cancel"
t('settings.title')             // "Settings"

// ✅ Functions with parameters
t('common.welcome', { name: 'Steve' })           // "Welcome, Steve!"
t('time.minutesAgo', { count: 5 })               // "5 minutes ago"
t('errors.fieldError', { field: 'Email', reason: 'Invalid format' })
```

#### Adding New Translations

1. **Check existing keys first** - Always check if the string already exists in the `common` object or other sections before adding new keys
2. **Think about context** - Consider the screen/component context when choosing the appropriate section (e.g., `settings.*`, `session.*`, `errors.*`)
3. **Add to ALL languages** - When adding new strings, you MUST add them to all language files in `sources/text/translations/`
4. **Use descriptive key names** - Use clear, hierarchical keys like `newSession.machineOffline` rather than generic names

#### Translation Structure
```typescript
// String constants for static text
cancel: 'Cancel',

// Functions for dynamic text with typed parameters  
welcome: ({ name }: { name: string }) => `Welcome, ${name}!`,
itemCount: ({ count }: { count: number }) => 
    count === 1 ? '1 item' : `${count} items`,
```

#### Key Sections
- `common.*` - Universal strings used across the app (buttons, actions, status)
- `settings.*` - Settings screen specific strings
- `session.*` - Session management and display
- `errors.*` - Error messages and validation
- `modals.*` - Modal dialogs and popups
- `components.*` - Component-specific strings organized by component name

#### Supported Languages
- **English** - Default language (sources/text/_default.ts)
- **Polish** - Full translation with plural form support (sources/text/translations/pl.ts)
- **Russian** - Full translation with plural form support (sources/text/translations/ru.ts)

#### Important Rules
- **Never hardcode strings** in JSX - always use `t('key')`
- **Dev pages exception** - Development/debug pages can skip i18n
- **Check common first** - Before adding new keys, check if a suitable translation exists in `common`
- **Context matters** - Consider where the string appears to choose the right section
- **Update all languages** - New strings must be added to every language file
- **Always re-read translations** - When new strings are added, always re-read the translation files to understand the existing structure and patterns before adding new keys
- **Use translations for common strings** - Always use the translation function `t()` for any user-visible string that is translatable, especially common UI elements like buttons, labels, and messages
- **Beware of technical terms** - When translating technical terms, consider:
  - Keep universally understood terms like "CLI", "API", "URL", "JSON" in their original form
  - Translate terms that have well-established equivalents in the target language
  - Use descriptive translations for complex technical concepts when direct translations don't exist
  - Maintain consistency across all technical terminology within the same language

### Important Files

- `sources/sync/apiTypes.ts` - Core type definitions for the sync protocol
- `sources/sync/apiSocket.ts` - WebSocket connection management
- `sources/sync/storage.ts` - MMKV-based persistence layer
- `sources/auth/AuthContext.tsx` - Authentication state management
- `sources/app/_layout.tsx` - Root navigation structure with auth guard
- `sources/app/(app)/_layout.tsx` - Main app navigation (drawer + stack)
- `sources/text/_default.ts` - English translation strings
- `sources/modal/index.ts` - Custom modal system exports
- `app.config.js` - Expo configuration with environment variants

### Custom Header Component

The app includes a custom header component (`sources/components/Header.tsx`) that provides consistent header rendering across platforms and integrates with React Navigation.

#### Usage with React Navigation:
```tsx
import { NavigationHeader } from '@/components/Header';

// As default for all screens in Stack navigator:
<Stack
    screenOptions={{
        header: NavigationHeader,
        // Other default options...
    }}
>

// Or for individual screens:
<Stack.Screen
    name="settings"
    options={{
        header: NavigationHeader,
        headerTitle: 'Settings',
        headerSubtitle: 'Manage your preferences', // Custom extension
        headerTintColor: '#000',
        // All standard React Navigation header options are supported
    }}
/>
```

The custom header supports all standard React Navigation header options plus:
- `headerSubtitle`: Display a subtitle below the main title
- `headerSubtitleStyle`: Style object for the subtitle text

This ensures consistent header appearance and behavior across iOS, Android, and web platforms.

## Unistyles Styling Guide

### Creating Styles

Always use `StyleSheet.create` from 'react-native-unistyles':

```typescript
import { StyleSheet } from 'react-native-unistyles'

const styles = StyleSheet.create((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: runtime.insets.top,
        paddingHorizontal: theme.margins.md,
    },
    text: {
        color: theme.colors.typography,
        fontSize: 16,
    }
}))
```

### Using Styles in Components

For React Native components, provide styles directly:

```typescript
import React from 'react'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

const styles = StyleSheet.create((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: runtime.insets.top,
    },
    text: {
        color: theme.colors.typography,
        fontSize: 16,
    }
}))

const MyComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello World</Text>
        </View>
    )
}
```

For other components, use `useStyles` hook:

```typescript
import React from 'react'
import { CustomComponent } from '@/components/CustomComponent'
import { useStyles } from 'react-native-unistyles'

const MyComponent = () => {
    const { styles, theme } = useStyles(styles)
    
    return (
        <CustomComponent style={styles.container} />
    )
}
```

### Variants

Create dynamic styles with variants:

```typescript
const styles = StyleSheet.create(theme => ({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        variants: {
            color: {
                primary: {
                    backgroundColor: theme.colors.primary,
                },
                secondary: {
                    backgroundColor: theme.colors.secondary,
                },
                default: {
                    backgroundColor: theme.colors.background,
                }
            },
            size: {
                small: {
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                },
                large: {
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                }
            }
        }
    }
}))

// Usage
const { styles } = useStyles(styles, {
    button: {
        color: 'primary',
        size: 'large'
    }
})
```

### Media Queries

Use media queries for responsive design:

```typescript
import { StyleSheet, mq } from 'react-native-unistyles'

const styles = StyleSheet.create(theme => ({
    container: {
        padding: theme.margins.sm,
        backgroundColor: {
            [mq.only.width(0, 768)]: theme.colors.background,
            [mq.only.width(768)]: theme.colors.secondary,
        }
    }
}))
```

### Breakpoints

Access current breakpoint in components:

```typescript
const MyComponent = () => {
    const { breakpoint } = useStyles()
    
    const isTablet = breakpoint === 'md' || breakpoint === 'lg'
    
    return (
        <View>
            {isTablet ? <TabletLayout /> : <MobileLayout />}
        </View>
    )
}
```

### Special Component Considerations

#### Expo Image
- **Size properties** (`width`, `height`) must be set outside of Unistyles stylesheet as inline styles
- **`tintColor` property** must be set directly on the component, not in style prop
- All other styling goes through Unistyles

```typescript
import { Image } from 'expo-image'
import { StyleSheet, useStyles } from 'react-native-unistyles'

const styles = StyleSheet.create((theme) => ({
    image: {
        borderRadius: 8,
        backgroundColor: theme.colors.background, // Other styles use theme
    }
}))

const MyComponent = () => {
    const { theme } = useStyles()
    
    return (
        <Image 
            style={[{ width: 100, height: 100 }, styles.image]}  // Size as inline styles
            tintColor={theme.colors.primary}                     // tintColor goes on component
            source={{ uri: 'https://example.com/image.jpg' }}
        />
    )
}
```

### Best Practices

1. **Always use `StyleSheet.create`** from 'react-native-unistyles'
2. **Provide styles directly** to components from 'react-native' and 'react-native-reanimated' packages
3. **Use `useStyles` hook only** for other components (but try to avoid it when possible)
4. **Always use function mode** when you need theme or runtime access
5. **Use variants** for component state-based styling instead of conditional styles
6. **Leverage breakpoints** for responsive design rather than manual dimension calculations
7. **Keep styles close to components** but extract common patterns to shared stylesheets
8. **Use TypeScript** for better developer experience and type safety

## Project Scope and Priorities

- This project targets Android, iOS, and web platforms
- Web is considered a secondary platform
- Avoid web-specific implementations unless explicitly requested
- Keep dev pages without i18n, always use t(...) function to translate all strings, when adding new string add it to all languages, think about context before translating.

## Environment Configuration

### App Variants
The app supports three build variants controlled by `APP_ENV`:
- `development` - Local development with debug features
- `preview` - Testing environment with preview features
- `production` - Production release

### Bundle Identifiers
- Development: `com.slopus.happy.dev`
- Preview: `com.slopus.happy.preview`
- Production: `com.ex3ndr.happy`

### Version Management
- App version: `1.4.1` (in app.config.js)
- Runtime version: `16` (for OTA updates)
- Changelog versions: Sequential integers (1, 2, 3...)

## Testing Strategy

### Unit Tests
- Run with `yarn test`
- Test files: `**/*.{spec,test}.ts`
- Framework: Vitest with Node.js environment
- Coverage reports available in text, JSON, and HTML formats

### Manual Testing Checklist
1. Run `yarn typecheck` before committing
2. Test on both iOS and Android simulators
3. Verify i18n for all new strings in all languages
4. Check responsive layout on different screen sizes
5. Test offline functionality and sync recovery