import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItem, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";
import { getItems } from "../../api";

type State<T extends IItem>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfig<T>; items: T[]; }
    | { state: "ERROR"; message: string; }

export const useLoadItemsOfType = <T extends IItem>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName } = useParams();

    const [state, setState] = useState<State<T>>({ state: "LOADING" });

    const fetch = async() => {
        try {
            setState({ state: "LOADING" });

            const itemTypeConfig = findItemConfigByName<T>(itemTypeConfigs, typeName!);

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const items = await getItems(itemTypeConfig);

            setState({ state: "LOADED", itemTypeConfig, items });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    };

    useEffect(() => {
        fetch();
    }, [typeName]);

    return state;
};
