import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

/** Temporary content for tabs that aren't built yet */
export function PlaceholderScreen({ title }: { title: string }) {
  return (
    // No bottom edge: the tab bar already handles that inset
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text className="heading-2">{title}</Text>
      <Text className="body-medium mt-2 text-ink-muted">Coming soon</Text>
    </SafeAreaView>
  );
}
