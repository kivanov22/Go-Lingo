import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

export default function Onboarding() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 px-6 pb-6">
        {/* Logo + app name */}
        <View className="flex-row items-center justify-center">
          <Image source={images.mascotLogo} className="size-20" resizeMode="contain" />
          <Text className="heading-2 -ml-2 text-[28px]">Go-Lingo</Text>
        </View>

        {/* Headline */}
        <View className="mt-4">
          <Text className="heading-1">Your AI language</Text>
          <Text className="heading-1">
            <Text className="text-lingua-deep-purple">teacher</Text>.
          </Text>
          <Text className="body-large mt-3 text-ink-muted">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot with speech bubbles */}
        <View className="flex-1 justify-center">
          <View className="aspect-square w-full">
            <Image source={images.mascotWelcome} className="size-full" resizeMode="contain" />

            <View className="absolute left-0 top-[6%] -rotate-6 rounded-2xl bg-[#EAF3FF] px-5 py-3">
              <Text className="heading-4 text-ink">Hello!</Text>
              <View className="absolute -bottom-1 right-5 size-3 rotate-45 bg-[#EAF3FF]" />
            </View>

            <View className="absolute right-0 top-[0%] -rotate-6 rounded-2xl bg-[#F1F1FF] px-5 py-3">
              <Text className="heading-4 text-[#3B2FE0]">¡Hola!</Text>
              <View className="absolute -bottom-1 left-5 size-3 rotate-45 bg-[#F1F1FF]" />
            </View>

            <View className="absolute right-0 top-[22%] rotate-6 rounded-2xl bg-[#FDEEE9] px-5 py-3">
              <Text className="heading-4 text-[#E5533D]">你好!</Text>
              <View className="absolute -bottom-1 left-5 size-3 rotate-45 bg-[#FDEEE9]" />
            </View>
          </View>
        </View>

        {/* Get Started button */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="h-[68px] flex-row items-center justify-center rounded-3xl bg-lingua-deep-purple"
          style={{
            shadowColor: colors.linguaDeepPurple,
            shadowOpacity: 0.3,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 6,
          }}
        >
          <Text className="heading-3 text-white">Get Started</Text>
          <View className="absolute right-6 size-3 rotate-45 border-r-2 border-t-2 border-white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
