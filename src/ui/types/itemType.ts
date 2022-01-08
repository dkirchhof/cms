import { IItem } from "./item";
import { PropEditor } from "./propEditor";

export type ItemTypeConfigs = IItemTypeConfig<any>[];

export type Name = [string, string];
export type GetLabel<T> = (type: T) => string;
export type GetTypeEditorInputs<T> = () => { [prop in keyof T]: PropEditor<T[prop]> | null };

export interface IItemTypeConfig<DATA extends IItem> {
    name: Name;
    getLabel: GetLabel<DATA>;
    getEditorInputs: GetTypeEditorInputs<DATA>;
}
