import { Text, TouchableOpacity, View } from "react-native";

export type SocialProvider = "Google" | "Facebook" | "Apple";
type Provider = SocialProvider;

type SocialButtonProps = {
  provider: Provider;
  onPress?: () => void;
};

const icons: Record<Provider, React.ReactNode> = {
  Google: (
    <Text className="text-[26px] font-poppins-bold text-[#4285F4]">G</Text>
  ),
  Facebook: (
    <View className="size-8 items-center justify-center rounded-full bg-[#1877F2]">
      <Text className="font-poppins-bold text-xl leading-[26px] text-white">
        f
      </Text>
    </View>
  ),
  // Apple logo glyph — only renders on Apple fonts until we add real SVG icons
  Apple: <Text className="text-[28px] text-ink">{""}</Text>,
};

export default function SocialButton({ provider, onPress }: SocialButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="h-[60px] flex-row items-center rounded-2xl border border-border bg-background"
    >
      <View className="w-[22%] items-center">{icons[provider]}</View>
      <Text className="heading-4 flex-1">Continue with {provider}</Text>
    </TouchableOpacity>
  );
}
