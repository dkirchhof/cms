import { FullType, IItemTypeConfig, MinimalType } from "../../shared/types/itemTypeConfig";
import { CreateItemBody, DeleteItemBody, GetItemBody, GetItemsBody, RequestBody, UpdateItemBody } from "../../shared/types/requestData";

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

export const getItem = async <T extends IItemTypeConfig<any, any>>(itemTypeConfig: T, id: string) => {
    const body: GetItemBody = {
        method: "getItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request<FullType<T>>(body);
};

export const getItems = async <T extends IItemTypeConfig<any, any>>(itemTypeConfig: T) => {
    const body: GetItemsBody = {
        method: "getItems",
        typeName: itemTypeConfig.name[0],
    };

    return request<MinimalType<T>[]>(body);
};

export const createItem = async <T extends IItemTypeConfig<any, any>>(itemTypeConfig: T, data: FullType<T>) => {
    const body: CreateItemBody = {
        method: "createItem",
        typeName: itemTypeConfig.name[0],
        newItemData: data,
    };

    return request<FullType<T>>(body);
};

export const updateItem = async <T extends IItemTypeConfig<any, any>>(itemTypeConfig: T, id: string, data: Partial<FullType<T>>) => {
    const body: UpdateItemBody = {
        method: "updateItem",
        typeName: itemTypeConfig.name[0],
        id,
        updatedItemData: data,
    };

    return request<FullType<T>>(body);
};

export const deleteItem = async (itemTypeConfig: IItemTypeConfig<any, any>, id: string) => {
    const body: DeleteItemBody = {
        method: "deleteItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request(body);
};
