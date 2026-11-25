import { useAuth, useUser } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguageStore } from "@/store/language-store";
import { colors } from "@/theme";

/** Temporary screen: holds the account actions until Profile is designed */
export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const clearSelectedLanguage = useLanguageStore((state) => state.clearSelectedLanguage);

  // Testing helper. Resetting the store sends the user back to language
  // selection via the route guards. The Clerk session is in SecureStore, so
  // the user stays signed in.
  const handleClearStorage = async () => {
    clearSelectedLanguage();
    await AsyncStorage.clear();
  };

  return (
    // No bottom edge: the tab bar already handles that inset
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View className="flex-1 items-center justify-center gap-4 px-6">
        <Text className="heading-2">Profile</Text>
        <Text className="body-large text-ink-muted">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleClearStorage}
          className="h-[60px] w-full items-center justify-center rounded-2xl border border-red-500"
        >
          <Text className="heading-3 text-red-500">Clear storage (testing)</Text>
        </TouchableOpacity>

        {/* Ending the session sends the user back to onboarding via the route guards */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => signOut()}
          className="h-[60px] w-full items-center justify-center rounded-2xl bg-lingua-deep-purple"
        >
          <Text className="heading-3 text-white">Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
