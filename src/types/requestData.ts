import { EditorFields, IEditorItem } from "../itemTypeBuilder/editorField";

export type RequestBody 
    = GetListBody
    | GetItemBody
    | CreateItemBody<any>
    | UpdateItemBody<any>
    | DeleteItemBody
    ;

export type GetListBody = { 
    method: "getList";
    typeName: string;
    page?: number;
    pageSize?: number;
};

export type GetItemBody = {
    method: "getItem";
    typeName: string;
    id: string;
}

export type CreateItemBody<T extends EditorFields> = {
    method: "createItem";
    typeName: string;
    values: IEditorItem<T>;
};

export type UpdateItemBody<T extends EditorFields> = {
    method: "updateItem";
    typeName: string;
    id: string;
    values: IEditorItem<T>;
};

export type DeleteItemBody = {
    method: "deleteItem";
    typeName: string;
    id: string;
};
