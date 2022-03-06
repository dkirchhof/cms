export type IListItem<PROPS extends string = any> = { id: string; } & Record<PROPS, string>;
