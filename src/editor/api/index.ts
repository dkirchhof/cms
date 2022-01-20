import { IItemTypeConfig, IItem } from "../../types/itemTypeConfig";
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

export const createItem = async <T extends IItem>(itemTypeConfig: IItemTypeConfig<T>, values: T) => {
    const body: CreateItemBody<T> = {
        method: "createItem",
        typeName: itemTypeConfig.name[0],
        values,
    };

    return request<T>(body);
};

export const updateItem = async <T extends IItem>(itemTypeConfig: IItemTypeConfig<T>, id: string, values: T) => {
    const body: UpdateItemBody<T> = {
        method: "updateItem",
        typeName: itemTypeConfig.name[0],
        id,
        values,
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
