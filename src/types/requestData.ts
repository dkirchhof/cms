export type RequestBody 
    = GetItemBody
    | GetItemsBody
    | CreateItemBody
    | UpdateItemBody
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

export type CreateItemBody = {
    method: "createItem";
    typeName: string;
    newItemData: any;
};

export type UpdateItemBody = {
    method: "updateItem";
    typeName: string;
    id: string;
    updatedItemData: any;
};

export type DeleteItemBody = {
    method: "deleteItem";
    typeName: string;
    id: string;
};
