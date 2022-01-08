import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findItemConfigByName } from "../../../shared/utils/findItemTypeConfig";
import { getItem } from "../../api";
import { IBlock } from "../../types/block";
import { IItem } from "../../types/item";
import { IItemTypeConfig, ItemTypeConfigs } from "../../types/itemType";
import { KeyOfWithType } from "../../types/keyOfWithType";

type State<T extends IItem>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfig<T>; item: T; prop: KeyOfWithType<T, IBlock>; }
    | { state: "ERROR"; message: string; }

export const useLoadPropOfCustomTypeItem = <T extends IItem>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName, id, prop: _prop } = useParams();

    const prop = _prop as KeyOfWithType<T, IBlock>;

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

            if (item[prop] === undefined) {
                throw new Error("prop doesn't exist in type");
            }

            setState({ state: "LOADED", itemTypeConfig, item, prop });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    };

    useEffect(() => {
        fetch();
    }, [typeName, id, prop]);

    return state;
};
