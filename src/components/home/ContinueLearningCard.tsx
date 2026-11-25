import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";

type ContinueLearningCardProps = {
  languageName: string;
  level: string;
  unitNumber: number;
  onContinue: () => void;
};

export function ContinueLearningCard({
  languageName,
  level,
  unitNumber,
  onContinue,
}: ContinueLearningCardProps) {
  return (
    <View
      className="h-[166px] overflow-hidden rounded-[20px] bg-lingua-deep-purple px-5 pt-[18px]"
      style={styles.gradient}
    >
      {/* Mountain silhouettes: rotated squares, clipped by the card */}
      <View className="absolute -bottom-[52px] right-[118px] size-[86px] rotate-45 rounded-xl bg-[#2e1a9e]/30" />
      <View className="absolute -bottom-[62px] right-[52px] size-[136px] rotate-45 rounded-2xl bg-[#2e1a9e]/25" />
      <View className="absolute -bottom-[40px] -right-[60px] size-[150px] rotate-45 rounded-2xl bg-white/10" />

      <Image
        source={images.palace}
        className="absolute -right-[18px] top-[6px] size-[178px]"
        resizeMode="contain"
      />

      <Text className="font-poppins text-[14px] leading-[20px] text-white">Continue learning</Text>
      <Text className="mt-1.5 font-poppins-semibold text-[24px] leading-[32px] text-white">
        {languageName}
      </Text>
      <Text className="font-poppins text-[15px] leading-[22px] text-white">
        {level} • Unit {unitNumber}
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onContinue}
        accessibilityRole="button"
        className="mt-3 h-[38px] w-[98px] items-center justify-center rounded-xl bg-white"
      >
        <Text className="font-poppins-semibold text-[14px] leading-[20px] text-lingua-deep-purple">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Gradients are set with the React Native style prop, not a class name.
  // The solid background class stays as the fallback.
  gradient: {
    experimental_backgroundImage: "linear-gradient(60deg, #5236ea 0%, #5b3bf6 55%, #8b74f8 100%)",
  },
});
