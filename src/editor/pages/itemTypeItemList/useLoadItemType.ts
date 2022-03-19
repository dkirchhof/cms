import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItemTypeForList } from "../../../itemTypeBuilder";
import { findItemTypeByName } from "../../../utils/findItemType";

type State
    = { state: "LOADING" }
    | { state: "LOADED"; itemType: IItemTypeForList<any>; }
    | { state: "ERROR"; message: string; }

export const useLoadItemType = (itemTypes: IItemTypeForList<any>[]) => {
    const { typeName } = useParams();

    const [state, setState] = useState<State>({ state: "LOADING" });

    useEffect(() => {
        const itemType = findItemTypeByName(itemTypes, typeName!);

        if (!itemType) {
            setState({ state: "ERROR", message: "couldn't find typeConfig" });
        } else {
            setState({ state: "LOADED", itemType });
        }
    }, [typeName]);

    return state;
};
