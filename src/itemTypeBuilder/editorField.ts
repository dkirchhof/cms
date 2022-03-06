import { PropEditor } from "../editor/types/propEditor";

export type PropValidator<T> = (value: T) => string | null;

export interface IEditorField<T, LOCALIZE extends boolean> {
    label?: string;
    localize: LOCALIZE;
    fullscreen?: boolean;
    editor: PropEditor<T>;
    defaultValue: T;
    validators: PropValidator<T>[];
}

export type EditorFields<T extends string = any> = Record<T, IEditorField<any, boolean>>;

export type IEditorItem<T extends EditorFields<any> = any, LOCALES extends string = any> = { id: string; } & {
    [P in keyof T]: T[P] extends IEditorField<infer U, false> 
        ? U 
        : T[P] extends IEditorField<infer U, true> 
        ? Record<LOCALES, U>
        : never;
};
