import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findItemConfigByName } from "../../../shared/utils/findItemTypeConfig";
import { getItem } from "../../api";
import { IItem } from "../../types/item";
import { IItemTypeConfig, ItemTypeConfigs } from "../../types/itemType";

type State<T extends IItem>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfig<T>; item: T; }
    | { state: "ERROR"; message: string; }

export const useLoadItem = <T extends IItem>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName, id } = useParams();

    const [state, setState] = useState<State<T>>({ state: "LOADING" });
    
    const fetch = async () => {
        try {
            const itemTypeConfig = findItemConfigByName(itemTypeConfigs, typeName!);

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const item = await getItem<T>(itemTypeConfig, id!);

            if (!item) {
                throw new Error("couldn't find item");
            }

            setState({ state: "LOADED", itemTypeConfig, item });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }

    useEffect(() => {
        fetch();
    }, [typeName, id]);

    return state;
};
