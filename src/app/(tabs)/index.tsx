import { useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContinueLearningCard } from "@/components/home/ContinueLearningCard";
import { DailyGoalCard } from "@/components/home/DailyGoalCard";
import { HomeHeader } from "@/components/home/HomeHeader";
import { NextUpCard } from "@/components/home/NextUpCard";
import { TodayPlan, type PlanItem } from "@/components/home/TodayPlan";
import { getLanguage } from "@/data/languages";
import { getLessonsByUnit } from "@/data/lessons";
import { mockProgress, type PlanItemId } from "@/data/progress";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { colors } from "@/theme";
import type { Difficulty, Lesson } from "@/types/learning";

const LEVELS: Record<Difficulty, string> = {
  beginner: "A1",
  elementary: "A2",
};

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const language = selectedLanguage ? getLanguage(selectedLanguage) : undefined;

  // The route guard only shows the tabs once a language is selected
  if (!language) return null;

  // Until lesson completion is tracked, the current lesson is the first one
  const unit = getUnitsByLanguage(language.code)[0];
  const lesson = unit ? getLessonsByUnit(unit.id)[0] : undefined;

  return (
    // No bottom edge: the tab bar already handles that inset
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader language={language} userName={user?.firstName} streak={mockProgress.streak} />

        <View className="mt-3">
          <DailyGoalCard xp={mockProgress.xpToday} goal={mockProgress.dailyXpGoal} />
        </View>

        {unit && lesson && (
          <>
            <View className="mt-5">
              <ContinueLearningCard
                languageName={language.name}
                level={LEVELS[lesson.difficulty]}
                unitNumber={unit.order}
                onContinue={() => router.navigate("/learn")}
              />
            </View>

            <View className="mt-6">
              <TodayPlan
                items={buildTodayPlan(lesson)}
                onViewAll={() => router.navigate("/learn")}
              />
            </View>
          </>
        )}

        <View className="mt-7">
          <NextUpCard onStartCall={() => router.navigate("/ai-teacher")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function buildTodayPlan(lesson: Lesson): PlanItem[] {
  const isCompleted = (id: PlanItemId) => mockProgress.completedPlanItems.includes(id);

  return [
    {
      id: "lesson",
      title: "Lesson",
      subtitle: lesson.title,
      icon: { ios: "book.fill", android: "menu_book", web: "menu_book" },
      color: "purple",
      isCompleted: isCompleted("lesson"),
    },
    {
      id: "conversation",
      title: "AI Conversation",
      subtitle: lesson.goals[1] ?? lesson.description,
      icon: { ios: "headphones", android: "headphones", web: "headphones" },
      color: "purple",
      isCompleted: isCompleted("conversation"),
    },
    {
      id: "words",
      title: "New words",
      subtitle: `${lesson.vocabulary.length} words`,
      icon: { ios: "ellipsis.bubble.fill", android: "sms", web: "sms" },
      color: "coral",
      isCompleted: isCompleted("words"),
    },
  ];
}
