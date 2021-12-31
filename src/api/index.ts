import { getItemOfType, getItemsOfType } from "../myDatabaseService"
import { ICustomType } from "../types/customType";

export const getItem = async <T>(typeName: string, id: string) => getItemOfType(typeName, id) as ICustomType<T>;
export const getItems = async <T>(typeName: string) => getItemsOfType(typeName) as ICustomType<T>[];
export const createItem = async (typeName: string, data: any) => { }
export const updateItem = async (id: string, data: any) => { }
export const deleteItem = async (id: string) => { }
