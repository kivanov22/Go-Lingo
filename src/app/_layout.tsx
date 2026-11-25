import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLanguageStore } from "@/store/language-store";
import { fontAssets } from "@/theme";

import "../../global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add your key to .env.local.\nRun: 1) clerk auth login  2) clerk link  3) clerk env pull — then restart the dev server.");
}

// Keep the native splash screen up until the Poppins fonts are ready.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </ClerkProvider>
  );
}

// Signed out: onboarding + auth screens.
// Signed in without a language: language selection only.
// Signed in with a language: the tabs (and language selection to change it).
// Expo Router redirects automatically when the guards change.
function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);
  const hasLanguage = useLanguageStore((state) => state.selectedLanguage !== null);

  // Wait until the Clerk session and saved language are restored so we don't
  // flash the wrong screen
  if (!isLoaded || !hasHydrated) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn === true && hasLanguage}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn === true}>
        <Stack.Screen name="language" />
      </Stack.Protected>
    </Stack>
  );
}