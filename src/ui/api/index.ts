import { CreateItemBody, DeleteItemBody, GetItemBody, GetItemsBody, RequestBody, UpdateItemBody } from "../../shared/types/requestData";
import { IItem } from "../types/item";

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

export const getItem = async <T extends IItem>(typeName: string, id: string) => {
    const body: GetItemBody = {
        method: "getItem",
        typeName,
        id,
    };

    return request<T>(body);
};

export const getItems = async <T extends IItem>(typeName: string) => {
    const body: GetItemsBody = {
        method: "getItems",
        typeName,
    };

    return request<T[]>(body);
};

export const createItem = async <T extends IItem>(typeName: string, data: T) => {
    const body: CreateItemBody = {
        method: "createItem",
        typeName,
        newItemData: data,
    };

    return request<T>(body);
};

export const updateItem = async <T extends IItem>(typeName: string, id: string, data: T) => { 
    const body: UpdateItemBody = {
        method: "updateItem",
        typeName,
        id,
        updatedItemData: data,
    };

    return request<T>(body);
};

export const deleteItem = async (typeName: string, id: string) => {
    const body: DeleteItemBody = {
        method: "deleteItem",
        typeName,
        id,
    };

    return request(body);
};
