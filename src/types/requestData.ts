export type RequestBody 
    = GetListBody
    | GetItemBody
    | CreateItemBody<any>
    | UpdateItemBody<any>
    | DeleteItemBody
    ;

export type GetListBody = { 
    method: "getList";
    typeName: string;
};

export type GetItemBody = {
    method: "getItem";
    typeName: string;
    id: string;
}

export type CreateItemBody<T> = {
    method: "createItem";
    typeName: string;
    values: T;
};

export type UpdateItemBody<T> = {
    method: "updateItem";
    typeName: string;
    id: string;
    values: T;
};

export type DeleteItemBody = {
    method: "deleteItem";
    typeName: string;
    id: string;
};
