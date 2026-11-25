export type LanguageCode = "es" | "fr" | "de" | "ja" | "bg";

export type LessonType = "video" | "audio" | "chat" | "vocabulary";

export type Difficulty = "beginner" | "elementary";

export type Language = {
  code: LanguageCode;
  name: string;
  nativeName: string;
  /** "Hello" in this language, shown in the home header */
  greeting: string;
  /** Flag image URL (flagcdn.com PNG), use with <Image source={{ uri: flag }} /> */
  flag: string;
  /** Number of learners shown on the language card, e.g. "28.4M" */
  learners: string;
  /** BCP-47 locale, useful later for speech / TTS */
  locale: string;
};

export type VocabularyItem = {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
};

export type Phrase = {
  id: string;
  text: string;
  translation: string;
  pronunciation?: string;
};

export type Activity =
  | {
      id: string;
      type: "multiple-choice";
      prompt: string;
      options: string[];
      correctAnswer: string;
    }
  | {
      id: string;
      type: "translate";
      prompt: string;
      answer: string;
    }
  | {
      id: string;
      type: "repeat-phrase";
      phraseId: string;
    };

/** Instructions for the AI teacher (future Vision Agent audio lessons). */
export type AITeacherPrompt = {
  persona: string;
  systemPrompt: string;
  openingLine: string;
};

export type Lesson = {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  type: LessonType;
  difficulty: Difficulty;
  durationMinutes: number;
  xpReward: number;
  goals: string[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  teacherPrompt: AITeacherPrompt;
};

export type Unit = {
  id: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
  lessonIds: string[];
};
