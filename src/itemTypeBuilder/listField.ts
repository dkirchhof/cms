export type IListItem<LIST_PROPS extends string = any> = { id: string; } & Record<LIST_PROPS, string>;

export interface IListType<LIST_PROPS extends string = any> {
    listProps: readonly LIST_PROPS[]; 
    t: IListItem<LIST_PROPS>;
}

export const createListType = <LIST_PROPS extends string>(listProps: readonly LIST_PROPS[]): IListType<LIST_PROPS> => ({
    listProps,
    t: null as any,
});
