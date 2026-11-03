import { Text, View } from "react-native";

const SWATCHES = [
  { name: "Lingua Purple", className: "bg-lingua-purple" },
  { name: "Lingua Deep Purple", className: "bg-lingua-deep-purple" },
  { name: "Lingua Blue", className: "bg-lingua-blue" },
  { name: "Lingua Green", className: "bg-lingua-green" },
  { name: "Warning", className: "bg-warning" },
  { name: "Streak", className: "bg-streak" },
  { name: "Error", className: "bg-error" },
  { name: "Info", className: "bg-info" },
];

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="typo_h1 color-lingua-purple text-2xl">
        Hello, World!
      </Text>
    </View>
  );
}
