export type Localized<T, LOCALES extends readonly string[]> = Record<LOCALES[number], T>;

export interface ILocales<LOCALES extends string> {
    locales: readonly LOCALES[];
    t: LOCALES;
}

export const createLocales = <LOCALES extends string>(locales: readonly LOCALES[]): ILocales<LOCALES> => ({
    locales,
    t: null as any,
});
