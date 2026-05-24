import { Stack } from 'expo-router';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { hasSupabaseEnv, missingSupabaseConfigMessage } from '../src/lib/env';
import { AppProvider } from '../src/providers/AppProvider';
import { usePreferences } from '../src/providers/PreferencesProvider';

function RootNavigator() {
  const { palette } = usePreferences();
  const styles = createStyles(palette);

  if (!hasSupabaseEnv()) {
    return (
      <>
        <StatusBar barStyle={palette.statusBar} />
        <View style={styles.screen}>
          <View style={styles.card}>
            <Text style={styles.title}>App setup needed</Text>
            <Text style={styles.body}>{missingSupabaseConfigMessage}</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle={palette.statusBar} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: palette.background },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}

const createStyles = (palette: ReturnType<typeof usePreferences>['palette']) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: palette.background,
      padding: 24,
      justifyContent: 'center',
    },
    card: {
      backgroundColor: palette.card,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: palette.border,
      padding: 22,
    },
    title: {
      color: palette.text,
      fontSize: 24,
      fontWeight: '800',
    },
    body: {
      color: palette.textMuted,
      fontSize: 16,
      lineHeight: 24,
      marginTop: 12,
    },
  });
