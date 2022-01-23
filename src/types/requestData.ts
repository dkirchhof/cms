export type RequestBody 
    = GetEntityBody
    | GetEntitiesBody
    | GetEditableItemBody
    | CreateItemBody<any>
    | UpdateItemBody<any>
    | DeleteItemBody
    ;

export type GetEntityBody = {
    method: "getEntity";
    typeName: string;
    id: string;
};

export type GetEntitiesBody = { 
    method: "getEntities";
    typeName: string;
};

export type GetEditableItemBody = {
    method: "getEditableItem";
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
