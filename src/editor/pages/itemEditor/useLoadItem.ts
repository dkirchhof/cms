import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItem, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";
import { getItem } from "../../api";

type State<T extends IItem>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfig<T>; item: T | null; }
    | { state: "ERROR"; message: string; }

export const useLoadItem = <T extends IItem>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName, id } = useParams();

    const [state, setState] = useState<State<T>>({ state: "LOADING" });
    
    const fetch = async () => {
        try {
            setState({ state: "LOADING" });

            const itemTypeConfig = findItemConfigByName<T>(itemTypeConfigs, typeName!);

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            if(id === "new") {
                setState({ state: "LOADED", itemTypeConfig, item: null });
            } else {
               const item = await getItem(itemTypeConfig, id!);

               setState({ state: "LOADED", itemTypeConfig, item });
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
