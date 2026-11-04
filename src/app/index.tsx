import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="heading-1 text-lingua-purple">Hello, World!</Text>
      <Link href="/onboarding" className="body-large text-lingua-deep-purple">
        Open onboarding
      </Link>
    </View>
  );
}
