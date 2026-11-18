import type {
  AITeacherPrompt,
  Lesson,
  LanguageCode,
  Phrase,
  VocabularyItem,
} from "@/types/learning";

import { getLanguage } from "./languages";

/** Builds the AI teacher prompt used by future audio Vision Agent lessons. */
function createTeacherPrompt(
  code: LanguageCode,
  topic: string,
  openingLine: string,
): AITeacherPrompt {
  const language = getLanguage(code)?.name ?? code;

  return {
    persona: `Friendly ${language} teacher`,
    openingLine,
    systemPrompt: [
      `You are a warm, patient ${language} teacher for an absolute beginner who speaks English.`,
      `Today's topic: ${topic}.`,
      "Speak mostly in English, introduce one new word or phrase at a time in the target language, and ask the learner to repeat it out loud.",
      "Give short, encouraging feedback and gently correct pronunciation mistakes.",
      "Keep each reply under three sentences. End the lesson with a short recap.",
    ].join(" "),
  };
}

const esVocab: VocabularyItem[] = [
  { id: "es-hola", word: "Hola", translation: "Hello", pronunciation: "OH-la", example: "¡Hola! ¿Cómo estás?" },
  { id: "es-adios", word: "Adiós", translation: "Goodbye", pronunciation: "ah-DYOHS" },
  { id: "es-gracias", word: "Gracias", translation: "Thank you", pronunciation: "GRAH-syahs" },
];
const esPhrases: Phrase[] = [
  { id: "es-p1", text: "Me llamo Ana.", translation: "My name is Ana.", pronunciation: "meh YAH-moh AH-nah" },
  { id: "es-p2", text: "Mucho gusto.", translation: "Nice to meet you.", pronunciation: "MOO-choh GOOS-toh" },
];

const frVocab: VocabularyItem[] = [
  { id: "fr-bonjour", word: "Bonjour", translation: "Hello", pronunciation: "bon-ZHOOR", example: "Bonjour, ça va ?" },
  { id: "fr-aurevoir", word: "Au revoir", translation: "Goodbye", pronunciation: "oh ruh-VWAHR" },
  { id: "fr-merci", word: "Merci", translation: "Thank you", pronunciation: "mehr-SEE" },
];
const frPhrases: Phrase[] = [
  { id: "fr-p1", text: "Je m'appelle Léa.", translation: "My name is Léa.", pronunciation: "zhuh mah-PEL lay-AH" },
  { id: "fr-p2", text: "Enchanté.", translation: "Nice to meet you.", pronunciation: "on-shon-TAY" },
];

const deVocab: VocabularyItem[] = [
  { id: "de-hallo", word: "Hallo", translation: "Hello", pronunciation: "HAH-loh", example: "Hallo, wie geht's?" },
  { id: "de-tschuss", word: "Tschüss", translation: "Bye", pronunciation: "tshues" },
  { id: "de-danke", word: "Danke", translation: "Thank you", pronunciation: "DAHN-kuh" },
];
const dePhrases: Phrase[] = [
  { id: "de-p1", text: "Ich heiße Max.", translation: "My name is Max.", pronunciation: "ikh HY-suh maks" },
  { id: "de-p2", text: "Freut mich.", translation: "Nice to meet you.", pronunciation: "froyt mikh" },
];

const jaVocab: VocabularyItem[] = [
  { id: "ja-konnichiwa", word: "こんにちは", translation: "Hello", pronunciation: "kon-ni-chi-wa" },
  { id: "ja-sayonara", word: "さようなら", translation: "Goodbye", pronunciation: "sa-yo-o-na-ra" },
  { id: "ja-arigato", word: "ありがとう", translation: "Thank you", pronunciation: "a-ri-ga-to-o" },
];
const jaPhrases: Phrase[] = [
  { id: "ja-p1", text: "わたしはユキです。", translation: "I am Yuki.", pronunciation: "wa-ta-shi wa yu-ki des" },
  { id: "ja-p2", text: "はじめまして。", translation: "Nice to meet you.", pronunciation: "ha-ji-me-ma-shi-te" },
];

const bgVocab: VocabularyItem[] = [
  { id: "bg-zdravey", word: "Здравей", translation: "Hello", pronunciation: "zdrah-VEY", example: "Здравей, как си?" },
  { id: "bg-dovizhdane", word: "Довиждане", translation: "Goodbye", pronunciation: "doh-VEEZH-dah-neh" },
  { id: "bg-blagodarya", word: "Благодаря", translation: "Thank you", pronunciation: "blah-goh-dah-RYAH" },
];
const bgPhrases: Phrase[] = [
  { id: "bg-p1", text: "Казвам се Иван.", translation: "My name is Ivan.", pronunciation: "KAHZ-vahm seh ee-VAHN" },
  { id: "bg-p2", text: "Приятно ми е.", translation: "Nice to meet you.", pronunciation: "pree-YAHT-noh mee eh" },
];

export const lessons: Lesson[] = [
  // Spanish
  {
    id: "es-greetings-audio",
    unitId: "es-unit-1",
    languageCode: "es",
    title: "Say Hello",
    description: "Practice greetings out loud with your AI teacher.",
    type: "audio",
    difficulty: "beginner",
    durationMinutes: 5,
    xpReward: 20,
    goals: ["Greet someone in Spanish", "Introduce yourself", "Say thank you"],
    vocabulary: esVocab,
    phrases: esPhrases,
    activities: [
      { id: "es-a1", type: "repeat-phrase", phraseId: "es-p1" },
      { id: "es-a2", type: "repeat-phrase", phraseId: "es-p2" },
    ],
    teacherPrompt: createTeacherPrompt(
      "es",
      "basic greetings and introductions",
      "¡Hola! Today we'll learn how to say hello in Spanish. Ready?",
    ),
  },
  {
    id: "es-greetings-vocab",
    unitId: "es-unit-1",
    languageCode: "es",
    title: "Greetings Review",
    description: "Review the key greeting words.",
    type: "vocabulary",
    difficulty: "beginner",
    durationMinutes: 3,
    xpReward: 10,
    goals: ["Recognize hello, goodbye and thank you"],
    vocabulary: esVocab,
    phrases: [],
    activities: [
      {
        id: "es-b1",
        type: "multiple-choice",
        prompt: 'What does "Hola" mean?',
        options: ["Hello", "Goodbye", "Thank you"],
        correctAnswer: "Hello",
      },
      { id: "es-b2", type: "translate", prompt: "Translate: Thank you", answer: "Gracias" },
    ],
    teacherPrompt: createTeacherPrompt("es", "reviewing greeting vocabulary", "¡Hola! Let's review."),
  },

  // French
  {
    id: "fr-greetings-audio",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "Say Hello",
    description: "Practice greetings out loud with your AI teacher.",
    type: "audio",
    difficulty: "beginner",
    durationMinutes: 5,
    xpReward: 20,
    goals: ["Greet someone in French", "Introduce yourself", "Say thank you"],
    vocabulary: frVocab,
    phrases: frPhrases,
    activities: [
      { id: "fr-a1", type: "repeat-phrase", phraseId: "fr-p1" },
      { id: "fr-a2", type: "repeat-phrase", phraseId: "fr-p2" },
    ],
    teacherPrompt: createTeacherPrompt(
      "fr",
      "basic greetings and introductions",
      "Bonjour! Today we'll learn how to say hello in French. Ready?",
    ),
  },
  {
    id: "fr-greetings-vocab",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "Greetings Review",
    description: "Review the key greeting words.",
    type: "vocabulary",
    difficulty: "beginner",
    durationMinutes: 3,
    xpReward: 10,
    goals: ["Recognize hello, goodbye and thank you"],
    vocabulary: frVocab,
    phrases: [],
    activities: [
      {
        id: "fr-b1",
        type: "multiple-choice",
        prompt: 'What does "Bonjour" mean?',
        options: ["Hello", "Goodbye", "Thank you"],
        correctAnswer: "Hello",
      },
      { id: "fr-b2", type: "translate", prompt: "Translate: Thank you", answer: "Merci" },
    ],
    teacherPrompt: createTeacherPrompt("fr", "reviewing greeting vocabulary", "Bonjour! Let's review."),
  },

  // German
  {
    id: "de-greetings-audio",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Say Hello",
    description: "Practice greetings out loud with your AI teacher.",
    type: "audio",
    difficulty: "beginner",
    durationMinutes: 5,
    xpReward: 20,
    goals: ["Greet someone in German", "Introduce yourself", "Say thank you"],
    vocabulary: deVocab,
    phrases: dePhrases,
    activities: [
      { id: "de-a1", type: "repeat-phrase", phraseId: "de-p1" },
      { id: "de-a2", type: "repeat-phrase", phraseId: "de-p2" },
    ],
    teacherPrompt: createTeacherPrompt(
      "de",
      "basic greetings and introductions",
      "Hallo! Today we'll learn how to say hello in German. Ready?",
    ),
  },
  {
    id: "de-greetings-vocab",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Greetings Review",
    description: "Review the key greeting words.",
    type: "vocabulary",
    difficulty: "beginner",
    durationMinutes: 3,
    xpReward: 10,
    goals: ["Recognize hello, bye and thank you"],
    vocabulary: deVocab,
    phrases: [],
    activities: [
      {
        id: "de-b1",
        type: "multiple-choice",
        prompt: 'What does "Hallo" mean?',
        options: ["Hello", "Bye", "Thank you"],
        correctAnswer: "Hello",
      },
      { id: "de-b2", type: "translate", prompt: "Translate: Thank you", answer: "Danke" },
    ],
    teacherPrompt: createTeacherPrompt("de", "reviewing greeting vocabulary", "Hallo! Let's review."),
  },

  // Japanese
  {
    id: "ja-greetings-audio",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Say Hello",
    description: "Practice greetings out loud with your AI teacher.",
    type: "audio",
    difficulty: "beginner",
    durationMinutes: 5,
    xpReward: 20,
    goals: ["Greet someone in Japanese", "Introduce yourself", "Say thank you"],
    vocabulary: jaVocab,
    phrases: jaPhrases,
    activities: [
      { id: "ja-a1", type: "repeat-phrase", phraseId: "ja-p1" },
      { id: "ja-a2", type: "repeat-phrase", phraseId: "ja-p2" },
    ],
    teacherPrompt: createTeacherPrompt(
      "ja",
      "basic greetings and introductions (use romaji alongside Japanese script)",
      "こんにちは! Today we'll learn how to say hello in Japanese. Ready?",
    ),
  },
  {
    id: "ja-greetings-vocab",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Greetings Review",
    description: "Review the key greeting words.",
    type: "vocabulary",
    difficulty: "beginner",
    durationMinutes: 3,
    xpReward: 10,
    goals: ["Recognize hello, goodbye and thank you"],
    vocabulary: jaVocab,
    phrases: [],
    activities: [
      {
        id: "ja-b1",
        type: "multiple-choice",
        prompt: 'What does "こんにちは" mean?',
        options: ["Hello", "Goodbye", "Thank you"],
        correctAnswer: "Hello",
      },
      { id: "ja-b2", type: "translate", prompt: "Translate: Thank you", answer: "ありがとう" },
    ],
    teacherPrompt: createTeacherPrompt("ja", "reviewing greeting vocabulary", "こんにちは! Let's review."),
  },

  // Bulgarian
  {
    id: "bg-greetings-audio",
    unitId: "bg-unit-1",
    languageCode: "bg",
    title: "Say Hello",
    description: "Practice greetings out loud with your AI teacher.",
    type: "audio",
    difficulty: "beginner",
    durationMinutes: 5,
    xpReward: 20,
    goals: ["Greet someone in Bulgarian", "Introduce yourself", "Say thank you"],
    vocabulary: bgVocab,
    phrases: bgPhrases,
    activities: [
      { id: "bg-a1", type: "repeat-phrase", phraseId: "bg-p1" },
      { id: "bg-a2", type: "repeat-phrase", phraseId: "bg-p2" },
    ],
    teacherPrompt: createTeacherPrompt(
      "bg",
      "basic greetings and introductions (use romanized pronunciation alongside Cyrillic)",
      "Здравей! Today we'll learn how to say hello in Bulgarian. Ready?",
    ),
  },
  {
    id: "bg-greetings-vocab",
    unitId: "bg-unit-1",
    languageCode: "bg",
    title: "Greetings Review",
    description: "Review the key greeting words.",
    type: "vocabulary",
    difficulty: "beginner",
    durationMinutes: 3,
    xpReward: 10,
    goals: ["Recognize hello, goodbye and thank you"],
    vocabulary: bgVocab,
    phrases: [],
    activities: [
      {
        id: "bg-b1",
        type: "multiple-choice",
        prompt: 'What does "Здравей" mean?',
        options: ["Hello", "Goodbye", "Thank you"],
        correctAnswer: "Hello",
      },
      { id: "bg-b2", type: "translate", prompt: "Translate: Thank you", answer: "Благодаря" },
    ],
    teacherPrompt: createTeacherPrompt("bg", "reviewing greeting vocabulary", "Здравей! Let's review."),
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons.filter((lesson) => lesson.unitId === unitId);
}
