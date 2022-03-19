import { IItemType, IItemTypeConfigForEditor, IItemTypeConfigForList } from "../../itemTypeBuilder";
import { EditorFields, IEditorItem } from "../../itemTypeBuilder/editorField";
import { IListItem } from "../../itemTypeBuilder/listField";
import { CreateItemBody, DeleteItemBody, GetListBody, RequestBody, UpdateItemBody, GetItemBody } from "../../types/requestData";

const getResponseContent = async (response: Response) => {
    const contentType = response.headers.get("Content-Type");

    if (contentType?.startsWith("application/json")) {
        return response.json();
    }

    return response.text();
};

const request = async <T>(body: RequestBody) => {
    const response = await fetch("/api/cms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const responseBody = await getResponseContent(response);

    if (response.ok) {
        return responseBody as T;
    } else {
        throw new Error(responseBody);
    }
};

export const getList = async <LIST_PROPS extends string>(itemTypeConfig: IItemTypeConfigForList<LIST_PROPS>, page?: number, pageSize?: number) => {
    const body: GetListBody = {
        method: "getList",
        typeName: itemTypeConfig.name[0],
        page,
        pageSize,
    };

    return request<{ items: IListItem<LIST_PROPS>[]; count: number; }>(body);
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

export const deleteItem = async (itemTypeConfig: IItemType, id: string) => {
    const body: DeleteItemBody = {
        method: "deleteItem",
        typeName: itemTypeConfig.name[0],
        id,
    };

    return request<void>(body);
};
