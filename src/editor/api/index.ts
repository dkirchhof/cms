import { IItemTypeConfig, IItemTypeConfigForEditor, IItemTypeConfigForList } from "../../itemTypeBuilder";
import { EditorFields, IEditorItem } from "../../itemTypeBuilder/editorField";
import { IListItem } from "../../itemTypeBuilder/listField";
import { CreateItemBody, DeleteItemBody, GetListBody, RequestBody, UpdateItemBody, GetItemBody } from "../../types/requestData";

const request = async <T>(body: RequestBody) => {
    const result = await fetch("/api/cms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (result.ok) {
        return await result.json() as T;
    } else {
        const error = await result.text();

        throw new Error(error);
    }
};

export const getList = async <LIST_PROPS extends string>(itemTypeConfig: IItemTypeConfigForList<LIST_PROPS>) => {
    const body: GetListBody = {
        method: "getList",
        typeName: itemTypeConfig.name[0],
    };

    return request<IListItem<LIST_PROPS>[]>(body);
};

export const getItem = async <EDITOR extends EditorFields>(itemTypeConfig: IItemTypeConfigForEditor<EDITOR>, id: string) => {
    const body: GetItemBody = {
        method: "getItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request<IEditorItem<EDITOR>>(body);
};

export const createItem = async <EDITOR extends EditorFields>(itemTypeConfig: IItemTypeConfigForEditor<EDITOR>, values: IEditorItem<EDITOR>) => {
    const body: CreateItemBody<EDITOR> = {
        method: "createItem",
        typeName: itemTypeConfig.name[0],
        values,
    };

    return request<string>(body);
};

export const updateItem = async <EDITOR extends EditorFields>(itemTypeConfig: IItemTypeConfigForEditor<EDITOR>, id: string, values: IEditorItem<EDITOR>) => {
    const body: UpdateItemBody<EDITOR> = {
        method: "updateItem",
        typeName: itemTypeConfig.name[0],
        id,
        values,
    };

    return request<void>(body);
};

export const deleteItem = async (itemTypeConfig: IItemTypeConfig, id: string) => {
    const body: DeleteItemBody = {
        method: "deleteItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request<void>(body);
};
