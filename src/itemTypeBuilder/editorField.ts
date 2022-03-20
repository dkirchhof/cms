import { PropEditor } from "../editor/types/propEditor";

export type PropValidator<T> = (value: T) => string | null;

export interface IEditorField<T, LOCALIZE extends boolean> {
    label?: string;
    localize: LOCALIZE;
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

export type IPartialEditorItem<T extends EditorFields<any> = any, LOCALES extends string = any> = { id: string; } & {
    [P in keyof T]?: T[P] extends IEditorField<infer U, false> 
        ? U 
        : T[P] extends IEditorField<infer U, true> 
        ? Record<LOCALES, U | undefined>
        : never;
};

export interface IEditorType<EDITOR extends EditorFields = any, LOCALES extends string = any> {
    fields: EditorFields;
    t: IEditorItem<EDITOR, LOCALES>;
    tPartial: IPartialEditorItem<EDITOR, LOCALES>;
}

export const createEditorType = <LOCALES extends string>() => <EDITOR extends EditorFields>(fields: EDITOR): IEditorType<EDITOR, LOCALES> => ({
    fields,
    t: null as any,
    tPartial: null as any,
});
