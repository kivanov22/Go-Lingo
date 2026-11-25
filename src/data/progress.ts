export type PlanItemId = "lesson" | "conversation" | "words";

type Progress = {
  streak: number;
  xpToday: number;
  dailyXpGoal: number;
  completedPlanItems: PlanItemId[];
};

/** Hardcoded until XP and lesson completion are tracked in a store */
export const mockProgress: Progress = {
  streak: 12,
  xpToday: 15,
  dailyXpGoal: 20,
  completedPlanItems: ["lesson"],
};
