export type Localized<T, LOCALES extends readonly string[]> = Record<LOCALES[number], T>;
