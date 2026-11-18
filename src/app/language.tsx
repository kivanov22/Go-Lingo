import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { colors } from "@/theme";
import type { LanguageCode } from "@/types/learning";

export default function LanguageSelection() {
  const router = useRouter();
  const [selected, setSelected] = useState<LanguageCode>("es");
  const [query, setQuery] = useState("");
  const searchRef = useRef<TextInput>(null);

  const filtered = languages.filter((language) =>
    `${language.name} ${language.nativeName}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 20 }}>
        {/* Header */}
        <View className="h-14 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            hitSlop={12}
            className="absolute left-1 size-10 items-center justify-center"
          >
            <View className="ml-1 size-3 rotate-[-45deg] border-b-2 border-l-2 border-ink" />
          </TouchableOpacity>
          <Text className="heading-3">Choose a language</Text>
        </View>

        {/* Search */}
        <Pressable
          onPress={() => searchRef.current?.focus()}
          className="mt-3 h-[52px] flex-row items-center rounded-full border border-border bg-surface px-5"
        >
          <View className="mr-3">
            <View className="size-[18px] rounded-full border-2 border-ink-muted" />
            <View className="absolute -bottom-0.5 -right-0.5 h-2 w-0.5 rotate-[-45deg] rounded bg-ink-muted" />
          </View>
          <View className="flex-1 justify-center">
            <TextInput
              ref={searchRef}
              value={query}
              onChangeText={setQuery}
              placeholder="Search languages"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
              className="body-large p-0"
            />
          </View>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="heading-4 mt-6">Popular</Text>

        {/* Language list */}
        <View className="mt-3 gap-3">
          {filtered.map((language) => {
            const isSelected = language.code === selected;

            return (
              <TouchableOpacity
                key={language.code}
                activeOpacity={0.85}
                onPress={() => setSelected(language.code)}
                className={`h-[84px] flex-row items-center rounded-2xl border px-4 ${
                  isSelected ? "border-lingua-purple bg-[#F5F3FF]" : "border-border bg-background"
                }`}
                style={{
                  borderWidth: isSelected ? 1.5 : 1,
                  shadowColor: colors.textPrimary,
                  shadowOpacity: isSelected ? 0 : 0.04,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: isSelected ? 0 : 1,
                }}
              >
                <Image
                  source={{ uri: language.flag }}
                  className="size-[52px] rounded-full border border-border"
                  resizeMode="cover"
                />
                <View className="ml-4 flex-1">
                  <Text className="heading-4">{language.name}</Text>
                  <Text className="body-small text-ink-muted">{language.learners} learners</Text>
                </View>

                {isSelected ? (
                  <View className="size-8 items-center justify-center rounded-full bg-lingua-deep-purple">
                    <View className="-mt-0.5 h-3 w-1.5 rotate-45 border-b-2 border-r-2 border-white" />
                  </View>
                ) : (
                  <View className="mr-1 size-2.5 rotate-45 border-r-2 border-t-2 border-ink-muted" />
                )}
              </TouchableOpacity>
            );
          })}

          {filtered.length === 0 && (
            <Text className="body-medium py-6 text-center text-ink-muted">No languages found</Text>
          )}
        </View>

        {/* Confirm */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.back()}
          className="mt-5 h-[60px] items-center justify-center rounded-2xl bg-lingua-deep-purple"
          style={{
            shadowColor: colors.linguaDeepPurple,
            shadowOpacity: 0.3,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 6,
          }}
        >
          <Text className="heading-3 text-white">Confirm</Text>
        </TouchableOpacity>

        {/* Earth illustration, bleeds to the screen edges */}
        <Image
          source={images.earth}
          className="-mx-5 mt-4 h-[200px] w-screen"
          resizeMode="cover"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
