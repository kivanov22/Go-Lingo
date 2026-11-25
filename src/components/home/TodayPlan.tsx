import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme";

export type PlanItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: SymbolViewProps["name"];
  color: "purple" | "coral";
  isCompleted: boolean;
};

const ICON_BACKGROUNDS: Record<PlanItem["color"], string> = {
  purple: "bg-lingua-deep-purple",
  coral: "bg-coral",
};

type TodayPlanProps = {
  items: PlanItem[];
  onViewAll: () => void;
};

export function TodayPlan({ items, onViewAll }: TodayPlanProps) {
  return (
    <View>
      <View className="flex-row items-center justify-between px-0.5">
        <Text className="font-poppins-semibold text-[16px] leading-[22px] text-ink">
          Today’s plan
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onViewAll}
          hitSlop={12}
          accessibilityRole="button"
        >
          <Text className="font-poppins-medium text-[15px] leading-[22px] text-lingua-deep-purple">
            View all
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-5 gap-[22px]">
        {items.map((item) => (
          <View
            key={item.id}
            className="h-[45px] flex-row items-center pl-0.5 pr-[11px]"
            accessible
            accessibilityLabel={`${item.title}, ${item.subtitle}, ${
              item.isCompleted ? "completed" : "not completed"
            }`}
          >
            <View
              className={`size-10 items-center justify-center rounded-xl ${ICON_BACKGROUNDS[item.color]}`}
            >
              <SymbolView name={item.icon} size={24} tintColor={colors.background} />
            </View>

            <View className="ml-[18px] flex-1">
              <Text
                className="font-poppins-medium text-[14px] leading-[20px] text-ink"
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text
                className="mt-1 font-poppins text-[14px] leading-[20px] text-ink-muted"
                numberOfLines={1}
              >
                {item.subtitle}
              </Text>
            </View>

            {item.isCompleted ? (
              <View className="size-6 items-center justify-center rounded-full bg-lingua-deep-purple">
                <View className="-mt-0.5 h-2.5 w-[5px] rotate-45 border-b-2 border-r-2 border-white" />
              </View>
            ) : (
              <View className="size-6 rounded-full border-2 border-ink-muted/70" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
