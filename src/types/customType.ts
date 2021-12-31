import { PropEditor } from "./propEditor";

export type CustomTypesMap = { [s: string]: ICustomTypeConfig<any>; };

export type GetLabel<T> = (type: T) => string;
export type GetTypeEditorInputs<T> = () => { [prop in keyof T]: PropEditor<T[prop]> };

export interface ICustomType<DATA> {
    id: string;
    createdAt: string;
    updatedAt: string;
    data: DATA;
}

export interface ICustomTypeConfig<DATA> {
    getLabel: GetLabel<DATA>;
    getEditorInputs: GetTypeEditorInputs<DATA>;
}
