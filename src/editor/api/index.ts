import { IItemTypeConfig, GetItemType } from "../../types/itemTypeConfig";
import { CreateItemBody, DeleteItemBody, GetItemBody, GetItemsBody, RequestBody, UpdateItemBody } from "../../types/requestData";

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

export const getItem = async <T extends IItemTypeConfig>(itemTypeConfig: T, id: string) => {
    const body: GetItemBody = {
        method: "getItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request<GetItemType<T>>(body);
};

export const getItems = async <T extends IItemTypeConfig>(itemTypeConfig: T) => {
    const body: GetItemsBody = {
        method: "getItems",
        typeName: itemTypeConfig.name[0],
    };

    return request<GetItemType<T>[]>(body);
};

export const createItem = async <T extends IItemTypeConfig>(itemTypeConfig: T, data: GetItemType<T>) => {
    const body: CreateItemBody = {
        method: "createItem",
        typeName: itemTypeConfig.name[0],
        newItemData: data,
    };

    return request<GetItemType<T>>(body);
};

export const updateItem = async <T extends IItemTypeConfig>(itemTypeConfig: T, id: string, data: Partial<GetItemType<T>>) => {
    const body: UpdateItemBody = {
        method: "updateItem",
        typeName: itemTypeConfig.name[0],
        id,
        updatedItemData: data,
    };

    return request<GetItemType<T>>(body);
};

export const deleteItem = async (itemTypeConfig: IItemTypeConfig, id: string) => {
    const body: DeleteItemBody = {
        method: "deleteItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request(body);
};
