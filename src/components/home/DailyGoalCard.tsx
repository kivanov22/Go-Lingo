import { Image, Text, View } from "react-native";

import { images } from "@/constants/images";

type DailyGoalCardProps = {
  xp: number;
  goal: number;
};

export function DailyGoalCard({ xp, goal }: DailyGoalCardProps) {
  const percent = Math.min(xp / goal, 1) * 100;

  return (
    <View className="h-[120px] flex-row items-center rounded-2xl bg-cream pl-5 pr-1.5">
      <View className="flex-1">
        <Text className="font-poppins-medium text-[14px] leading-[20px] text-ink">Daily goal</Text>
        <View className="mt-2 flex-row items-baseline">
          <Text className="font-poppins-bold text-[26px] leading-[34px] text-ink">{xp}</Text>
          <Text className="ml-2 font-poppins text-[15px] leading-[22px] text-ink-muted">
            / {goal} XP
          </Text>
        </View>

        <View
          className="mt-3 h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-cream-track"
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: goal, now: xp }}
        >
          {/* The width is calculated at runtime */}
          <View className="h-full rounded-full bg-streak" style={{ width: `${percent}%` }} />
        </View>
      </View>

      <Image source={images.treasure} className="ml-2 size-[112px]" resizeMode="contain" />
    </View>
  );
}
