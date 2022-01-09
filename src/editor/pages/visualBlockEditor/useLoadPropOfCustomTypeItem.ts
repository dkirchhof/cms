import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBlock } from "../../../types/block";
import { GetItemType, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";
import { getItem } from "../../api";
import { KeyOfWithType } from "../../types/keyOfWithType";

type State<T extends IItemTypeConfig>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: T; item: GetItemType<T>; prop: KeyOfWithType<GetItemType<T>, IBlock>; }
    | { state: "ERROR"; message: string; }

export const useLoadPropOfCustomTypeItem = <T extends IItemTypeConfig>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName, id, prop } = useParams();

    const [state, setState] = useState<State<T>>({ state: "LOADING" });

    const fetch = async () => {
        try {
            const itemTypeConfig = findItemConfigByName(itemTypeConfigs, typeName!) as any;

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const item = await getItem(itemTypeConfig, id!) as any;

            if (!item) {
                throw new Error("couldn't find item");
            }

            if (item[prop!] === undefined) {
                throw new Error("prop doesn't exist in type");
            }

            setState({ state: "LOADED", itemTypeConfig, item, prop: prop as any });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    };

    useEffect(() => {
        fetch();
    }, [typeName, id, prop]);

    return state;
};
