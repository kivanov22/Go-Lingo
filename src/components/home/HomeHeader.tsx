import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";
import { colors } from "@/theme";
import type { Language } from "@/types/learning";

type HomeHeaderProps = {
  language: Language;
  userName?: string | null;
  streak: number;
};

export function HomeHeader({ language, userName, streak }: HomeHeaderProps) {
  return (
    <View className="h-14 flex-row items-center px-1">
      {/* Tap the flag to switch language */}
      <Link href="/language" asChild>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Learning ${language.name}. Change language`}
        >
          <Image
            source={{ uri: language.flag }}
            className="size-8 rounded-full"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </Link>

      <Text
        className="ml-3 flex-1 font-poppins-semibold text-[16px] leading-[22px] text-ink"
        numberOfLines={1}
      >
        {language.greeting}
        {userName ? `, ${userName}` : ""}! 👋
      </Text>

      <View
        className="ml-2 flex-row items-center"
        accessible
        accessibilityLabel={`${streak} day streak`}
      >
        {/* The artwork has transparent padding, so the negative margins trim it */}
        <Image source={images.streakFire} className="-mx-1 -mt-1.5 size-10" resizeMode="contain" />
        <Text className="ml-2.5 font-poppins-medium text-[16px] leading-[22px] text-ink-muted">
          {streak}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        className="ml-6"
      >
        <SymbolView
          name={{ ios: "bell", android: "notifications", web: "notifications" }}
          size={25}
          tintColor={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}
