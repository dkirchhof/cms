import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetItemEditingType, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";
import { getItemForEditing } from "../../api";

type State<T extends IItemTypeConfig>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: T; item: GetItemEditingType<T>; mode: "create" | "update" }
    | { state: "ERROR"; message: string; }

export const useLoadItem = <T extends IItemTypeConfig>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName, id } = useParams();

    const [state, setState] = useState<State<T>>({ state: "LOADING" });
    
    const fetch = async () => {
        try {
            const itemTypeConfig = findItemConfigByName(itemTypeConfigs, typeName!) as T;

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            if(id === "new") {
                const item = itemTypeConfig.getInitialData() as GetItemEditingType<T>;

                setState({ state: "LOADED", itemTypeConfig, item, mode: "create" });
            } else {
               const item = await getItemForEditing(itemTypeConfig, id!) as GetItemEditingType<T>;

               setState({ state: "LOADED", itemTypeConfig, item, mode: "update" });
            }
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }

    useEffect(() => {
        fetch();
    }, [typeName, id]);

    return state;
};
