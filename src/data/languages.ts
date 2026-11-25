import type { Language, LanguageCode } from "@/types/learning";

export const languages: Language[] = [
  { code: "es", name: "Spanish", nativeName: "Español", greeting: "Hola", flag: "https://flagcdn.com/w320/es.png", learners: "28.4M", locale: "es-ES" },
  { code: "fr", name: "French", nativeName: "Français", greeting: "Salut", flag: "https://flagcdn.com/w320/fr.png", learners: "19.4M", locale: "fr-FR" },
  { code: "ja", name: "Japanese", nativeName: "日本語", greeting: "こんにちは", flag: "https://flagcdn.com/w320/jp.png", learners: "12.7M", locale: "ja-JP" },
  { code: "de", name: "German", nativeName: "Deutsch", greeting: "Hallo", flag: "https://flagcdn.com/w320/de.png", learners: "8.1M", locale: "de-DE" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", greeting: "Здравей", flag: "https://flagcdn.com/w320/bg.png", learners: "1.2M", locale: "bg-BG" },
];

export function getLanguage(code: LanguageCode): Language | undefined {
  return languages.find((language) => language.code === code);
}
