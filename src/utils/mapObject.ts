export const mapObject = <K, V>(object: any, callbackfn: (value: [K, V], index: number) => any) => {
    return Object.entries(object).map(callbackfn as any);
};
