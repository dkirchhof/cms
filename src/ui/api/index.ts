import { CreateItemBody, DeleteItemBody, GetItemBody, GetItemsBody, RequestBody, UpdateItemBody } from "../../shared/types/requestData";
import { IItem } from "../types/item";
import { IItemTypeConfig } from "../types/itemType";

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

export const getItem = async <T extends IItem>(itemTypeConfig: IItemTypeConfig<T>, id: string) => {
    const body: GetItemBody = {
        method: "getItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request<T>(body);
};

export const getItems = async <T extends IItem>(itemTypeConfig: IItemTypeConfig<T>) => {
    const body: GetItemsBody = {
        method: "getItems",
        typeName: itemTypeConfig.name[0],
    };

    return request<T[]>(body);
};

export const createItem = async <T extends IItem>(itemTypeConfig: IItemTypeConfig<T>, data: T) => {
    const body: CreateItemBody = {
        method: "createItem",
        typeName: itemTypeConfig.name[0],
        newItemData: data,
    };

    return request<T>(body);
};

export const updateItem = async <T extends IItem>(itemTypeConfig: IItemTypeConfig<T>, id: string, data: Partial<T>) => { 
    const body: UpdateItemBody = {
        method: "updateItem",
        typeName: itemTypeConfig.name[0],
        id,
        updatedItemData: data,
    };

    return request<T>(body);
};

export const deleteItem = async (itemTypeConfig: IItemTypeConfig<any>, id: string) => {
    const body: DeleteItemBody = {
        method: "deleteItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request(body);
};
