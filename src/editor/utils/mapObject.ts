export const mapObject = <K, V>(object: any, callbackfn: (value: [K, V], index: number) => any) => {
    return Object.entries(object).map(callbackfn as any);
};

export const reduceObject = <T, K, V>(object: any, callbackfn: (previousValue: T, currentValue: [K, V], index: number) => T) => {
    return Object.entries(object).reduce(callbackfn as any, {} as T);
};
