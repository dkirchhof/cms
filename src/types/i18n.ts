export type Localized<T, LOCALES extends readonly string[]> = Record<LOCALES[number], T>;

export type ILocales<LOCALES extends string> = readonly LOCALES[];

export const createLocales = <LOCALES extends string>(locales: readonly LOCALES[]): ILocales<LOCALES> => locales;
