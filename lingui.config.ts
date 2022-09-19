export default {
  catalogs: [
    {
      path: "<rootDir>/src/assets/locales/{locale}",
      include: ["<rootDir>/src"],
      exclude: ["**/node_modules/**"]
    },
  ],
  compileNamespace: "cjs",
  fallbackLocales: {
    default: "en-US",
  },
  format: "po",
  formatOptions: {
    lineNumbers: false,
  },
  locales: [
    "af-ZA",
    "ar-SA",
    "ca-ES",
    "cs-CZ",
    "da-DK",
    "de-DE",
    "el-GR",
    "en-US",
    "es-ES",
    "fi-FI",
    "fr-FR",
    "he-IL",
    "hu-HU",
    "id-ID",
    "it-IT",
    "ja-JP",
    "ko-KR",
    "nl-NL",
    "no-NO",
    "pl-PL",
    "pt-BR",
    "pt-PT",
    "ro-RO",
    "ru-RU",
    "sr-SP",
    "sv-SE",
    "tr-TR",
    "uk-UA",
    "vi-VN",
    "zh-CN",
    "zh-TW",
  ],
  orderBy: "messageId",
  rootDir: ".",
  runtimeConfigModule: ["@lingui/core", "i18n"],
  sourceLocale: "en-US",
};
