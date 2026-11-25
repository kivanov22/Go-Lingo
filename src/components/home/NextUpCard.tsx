import { SymbolView } from "expo-symbols";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";
import { colors } from "@/theme";

export function NextUpCard({ onStartCall }: { onStartCall: () => void }) {
  return (
    <View className="h-[108px] flex-row items-center rounded-2xl bg-mint pl-[18px] pr-3">
      <View className="flex-1">
        <Text className="font-poppins text-[13px] leading-[20px] text-ink">Next up</Text>
        <Text
          className="mt-1 font-poppins-semibold text-[16px] leading-[22px] text-ink"
          numberOfLines={1}
        >
          AI Video Call
        </Text>
        <Text
          className="mt-1 font-poppins text-[13px] leading-[20px] text-ink-muted"
          numberOfLines={1}
        >
          Practice speaking
        </Text>
      </View>

      {/* The pale ring is slightly taller than the card, as in the design */}
      <View className="mr-4 size-[116px] items-center justify-center rounded-full bg-mint">
        <Image
          source={images.aiTeacher}
          className="size-[86px] rounded-full bg-border"
          resizeMode="cover"
          accessibilityLabel="AI teacher"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onStartCall}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Start AI video call"
        className="size-10 items-center justify-center rounded-full bg-leaf"
      >
        <SymbolView
          name={{ ios: "video.fill", android: "videocam", web: "videocam" }}
          size={22}
          tintColor={colors.background}
        />
      </TouchableOpacity>
    </View>
  );
}
