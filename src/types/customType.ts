import { PropEditor } from "./propEditor";

export type CustomTypesMap = { [s: string]: ICustomTypeConfig<any>; };

export type GetLabel<T> = (type: T) => string;
export type GetTypeEditorInputs<T> = () => { [prop in keyof T]?: PropEditor<T[prop]> };

export interface ICustomTypeConfig<T extends { id: string; }> {
    getLabel: GetLabel<T>;
    getEditorInputs: GetTypeEditorInputs<T>;
}
