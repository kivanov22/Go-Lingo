import { useAuth, useUser } from "@clerk/expo";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
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

      {/* Ending the session sends the user back to onboarding via the route guards */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => signOut()}
        className="h-[60px] w-full items-center justify-center rounded-2xl bg-lingua-deep-purple"
      >
        <Text className="heading-3 text-white">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
