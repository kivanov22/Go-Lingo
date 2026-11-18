import { useRef } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

import { colors } from "@/theme";

type AuthInputProps = TextInputProps & {
  label: string;
  /** Extra element on the right side of the field, e.g. a show/hide toggle. */
  right?: React.ReactNode;
  /** Layout classes for the field card, e.g. spacing. */
  className?: string;
};

export default function AuthInput({
  label,
  right,
  className,
  ...inputProps
}: AuthInputProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    // Whole card is tappable so the keyboard opens from anywhere inside it
    <Pressable
      onPress={() => inputRef.current?.focus()}
      className={`h-[72px] flex-row items-center rounded-3xl border border-border bg-background px-5 ${className ?? ""}`}
    >
      <View className="flex-1 justify-center">
        <Text className="caption text-ink-muted">{label}</Text>
        <TextInput
          ref={inputRef}
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          className="body-large p-0"
          {...inputProps}
        />
      </View>
      {right}
    </Pressable>
  );
}
