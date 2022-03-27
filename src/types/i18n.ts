export type Localized<T, LOCALES extends string> = Record<LOCALES, T>;

export interface ILocales<LOCALES extends string> {
    locales: readonly LOCALES[];
    t: LOCALES;
}

export const createLocales = <LOCALES extends string>(locales: readonly LOCALES[]): ILocales<LOCALES> => ({
    locales,
    t: null as any,
});
