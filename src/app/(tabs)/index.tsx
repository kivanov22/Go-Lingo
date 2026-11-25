import { useAuth, useUser } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getLanguage } from "@/data/languages";
import { useLanguageStore } from "@/store/language-store";
import { colors } from "@/theme";

export default function Index() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const clearSelectedLanguage = useLanguageStore((state) => state.clearSelectedLanguage);
  const language = selectedLanguage ? getLanguage(selectedLanguage) : undefined;

  // Testing helper. Resetting the store sends the user back to language
  // selection via the route guards. The Clerk session is in SecureStore, so
  // the user stays signed in.
  const handleClearStorage = async () => {
    clearSelectedLanguage();
    await AsyncStorage.clear();
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {/* Header: tap the flag to switch language */}
      {language && (
        <View className="h-14 flex-row items-center px-5">
          <Link href="/language" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Learning ${language.name}. Change language`}
            >
              <Image
                source={{ uri: language.flag }}
                className="size-8 rounded-full border border-border"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </Link>
          <Text className="heading-4 ml-3 flex-1 font-poppins-semibold" numberOfLines={1}>
            {language.greeting}
            {user?.firstName ? `, ${user.firstName}` : ""}! 👋
          </Text>
        </View>
      )}

      <View className="flex-1 items-center justify-center gap-4 px-6">
        <Text className="heading-1 text-lingua-purple">Hello, World!</Text>
        <Text className="body-large text-ink-muted">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>

        <Link href="/language" asChild>
          <TouchableOpacity
            activeOpacity={0.85}
            className="h-[60px] w-full items-center justify-center rounded-2xl border border-lingua-deep-purple"
          >
            <Text className="heading-3 text-lingua-deep-purple">Choose a language</Text>
          </TouchableOpacity>
        </Link>

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
