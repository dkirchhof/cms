import { IItemTypeConfig, IItem, EditorItemData } from "../../types/itemTypeConfig";
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

export const getList = async <LIST_ITEM_DATA>(itemTypeConfig: IItemTypeConfig<LIST_ITEM_DATA>) => {
    const body: GetListBody = {
        method: "getList",
        typeName: itemTypeConfig.name[0],
    };

    return request<IItem<LIST_ITEM_DATA>[]>(body);
};

export const getItem = async <EDITOR_ITEM_DATA extends EditorItemData>(itemTypeConfig: IItemTypeConfig<any, EDITOR_ITEM_DATA>, id: string) => {
    const body: GetItemBody = {
        method: "getItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request<IItem<EDITOR_ITEM_DATA>>(body);
};

export const createItem = async <EDITOR_ITEM_DATA extends EditorItemData>(itemTypeConfig: IItemTypeConfig<any, EDITOR_ITEM_DATA>, values: EDITOR_ITEM_DATA) => {
    const body: CreateItemBody<EDITOR_ITEM_DATA> = {
        method: "createItem",
        typeName: itemTypeConfig.name[0],
        values,
    };

    return request<string>(body);
};

export const updateItem = async <EDITOR_ITEM_DATA extends EditorItemData>(itemTypeConfig: IItemTypeConfig<any, EDITOR_ITEM_DATA>, id: string, values: EDITOR_ITEM_DATA) => {
    const body: UpdateItemBody<EDITOR_ITEM_DATA> = {
        method: "updateItem",
        typeName: itemTypeConfig.name[0],
        id,
        values,
    };

    return request<void>(body);
};

export const deleteItem = async (itemTypeConfig: IItemTypeConfig<any, any>, id: string) => {
    const body: DeleteItemBody = {
        method: "deleteItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request<void>(body);
};
