import type { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  {
    id: "es-unit-1",
    languageCode: "es",
    order: 1,
    title: "Greetings",
    description: "Say hello and introduce yourself.",
    lessonIds: ["es-greetings-audio", "es-greetings-vocab"],
  },
  {
    id: "fr-unit-1",
    languageCode: "fr",
    order: 1,
    title: "Greetings",
    description: "Say hello and introduce yourself.",
    lessonIds: ["fr-greetings-audio", "fr-greetings-vocab"],
  },
  {
    id: "de-unit-1",
    languageCode: "de",
    order: 1,
    title: "Greetings",
    description: "Say hello and introduce yourself.",
    lessonIds: ["de-greetings-audio", "de-greetings-vocab"],
  },
  {
    id: "ja-unit-1",
    languageCode: "ja",
    order: 1,
    title: "Greetings",
    description: "Say hello and introduce yourself.",
    lessonIds: ["ja-greetings-audio", "ja-greetings-vocab"],
  },
  {
    id: "bg-unit-1",
    languageCode: "bg",
    order: 1,
    title: "Greetings",
    description: "Say hello and introduce yourself.",
    lessonIds: ["bg-greetings-audio", "bg-greetings-vocab"],
  },
];

export function getUnitsByLanguage(code: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageCode === code)
    .sort((a, b) => a.order - b.order);
}
