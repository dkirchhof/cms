import { Values } from "./itemTypeConfig";

export type RequestBody 
    = GetItemBody
    | GetItemsBody
    | CreateItemBody<any>
    | UpdateItemBody<any>
    | DeleteItemBody
    ;

export type GetItemBody = {
    method: "getItem";
    typeName: string;
    id: string;
};

export type GetItemsBody = { 
    method: "getItems";
    typeName: string;
};

export type CreateItemBody<T> = {
    method: "createItem";
    typeName: string;
    values: Values<T>;
};

export type UpdateItemBody<T> = {
    method: "updateItem";
    typeName: string;
    id: string;
    values: Values<T>;
};

export type DeleteItemBody = {
    method: "deleteItem";
    typeName: string;
    id: string;
};
