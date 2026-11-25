import { SymbolView, type SymbolViewProps } from "expo-symbols";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, type ColorValue } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";

import { colors } from "@/theme";

const CIRCLE_SIZE = 52;
const ICON_SIZE = 26;

type Tab = {
  label: string;
  /** SF Symbol on iOS, Material Symbol on Android and web */
  icon: SymbolViewProps["name"];
};

// Keys match the file names in app/(tabs)
const TABS: Record<string, Tab> = {
  index: { label: "Home", icon: { ios: "house", android: "home", web: "home" } },
  learn: { label: "Learn", icon: { ios: "book", android: "menu_book", web: "menu_book" } },
  "ai-teacher": {
    label: "AI Teacher",
    icon: { ios: "face.smiling", android: "face", web: "face" },
  },
  chat: { label: "Chat", icon: { ios: "bubble.left", android: "chat_bubble", web: "chat_bubble" } },
  profile: { label: "Profile", icon: { ios: "person", android: "person", web: "person" } },
};

export function TabBar({ state, navigation, insets }: BottomTabBarProps) {
  const [width, setWidth] = useState(0);
  const tabWidth = width / state.routes.length;

  // The circle's position, measured in tabs: 0 is the first tab, 4 is the last.
  // Values in between happen while it is moving.
  const position = useSharedValue(state.index);

  useEffect(() => {
    position.set(withSpring(state.index, { duration: 450, dampingRatio: 0.8 }));
  }, [state.index, position]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.get() * tabWidth + (tabWidth - CIRCLE_SIZE) / 2 }],
  }));

  return (
    // The outer view fills the gaps left by the bar's rounded corners
    <View className="bg-background">
      <View
        className="rounded-t-[28px] bg-background pt-2"
        style={[styles.shadow, { paddingBottom: Math.max(insets.bottom, 8) }]}
      >
        <View
          className="h-[60px] flex-row"
          onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
        >
          {/* Drawn first so it sits behind the icons */}
          {width > 0 && <Animated.View style={[styles.circle, circleStyle]} />}

          {state.routes.map((route, index) => {
            const tab = TABS[route.name];
            if (!tab) return null;

            const isFocused = state.index === index;

            const handlePress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <Pressable
                key={route.key}
                onPress={handlePress}
                onLongPress={() => navigation.emit({ type: "tabLongPress", target: route.key })}
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: isFocused }}
                className="flex-1"
              >
                <TabItem tab={tab} index={index} position={position} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

type TabItemProps = {
  tab: Tab;
  index: number;
  position: SharedValue<number>;
};

// Two stacked layers that cross-fade as the circle moves over the tab:
// icon + label when inactive, a white icon when the circle is behind it.
function TabItem({ tab, index, position }: TabItemProps) {
  const inactiveStyle = useAnimatedStyle(() => ({
    opacity: Math.min(Math.abs(position.get() - index), 1),
  }));
  const activeStyle = useAnimatedStyle(() => ({
    opacity: Math.max(1 - Math.abs(position.get() - index), 0),
  }));

  return (
    <View className="flex-1">
      <Animated.View style={[styles.layer, inactiveStyle]}>
        <TabIcon name={tab.icon} color={colors.textSecondary} />
        <Text className="mt-1 font-poppins text-[11px] text-ink-muted" numberOfLines={1}>
          {tab.label}
        </Text>
      </Animated.View>

      <Animated.View style={[styles.layer, activeStyle]}>
        <TabIcon name={tab.icon} color={colors.background} />
      </Animated.View>
    </View>
  );
}

function TabIcon({ name, color }: { name: Tab["icon"]; color: ColorValue }) {
  return <SymbolView name={name} size={ICON_SIZE} tintColor={color} />;
}

const styles = StyleSheet.create({
  shadow: {
    boxShadow: "0px -4px 20px rgba(13, 19, 43, 0.08)",
  },
  circle: {
    position: "absolute",
    top: 4,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.linguaDeepPurple,
  },
  layer: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
});
