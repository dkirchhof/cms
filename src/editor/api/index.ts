import { IItemTypeConfig, IItem } from "../../types/itemTypeConfig";
import { CreateItemBody, DeleteItemBody, GetEntityBody, GetEntitiesBody, RequestBody, UpdateItemBody, GetEditableItemBody } from "../../types/requestData";

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

export const getEntity = async <ENTITY extends IItem>(itemTypeConfig: IItemTypeConfig<ENTITY>, id: string) => {
    const body: GetEntityBody = {
        method: "getEntity",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request<ENTITY>(body);
};

export const getEntities = async <ENTITY extends IItem>(itemTypeConfig: IItemTypeConfig<ENTITY>) => {
    const body: GetEntitiesBody = {
        method: "getEntities",
        typeName: itemTypeConfig.name[0],
    };

    return request<ENTITY[]>(body);
};

export const getEditableItem = async <EDITABLE_ITEM extends IItem>(itemTypeConfig: IItemTypeConfig<any, EDITABLE_ITEM>, id: string) => {
    const body: GetEditableItemBody = {
        method: "getEditableItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request<EDITABLE_ITEM>(body);
};

export const createItem = async <EDITABLE_ITEM extends IItem>(itemTypeConfig: IItemTypeConfig<any, EDITABLE_ITEM>, values: EDITABLE_ITEM) => {
    const body: CreateItemBody<EDITABLE_ITEM> = {
        method: "createItem",
        typeName: itemTypeConfig.name[0],
        values,
    };

    return request<string>(body);
};

export const updateItem = async <EDITABLE_ITEM extends IItem>(itemTypeConfig: IItemTypeConfig<any, EDITABLE_ITEM>, id: string, values: EDITABLE_ITEM) => {
    const body: UpdateItemBody<EDITABLE_ITEM> = {
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
