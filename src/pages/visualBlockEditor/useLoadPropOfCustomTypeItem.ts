import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemOfType } from "../../myDatabaseService";
import { MY_TYPES } from "../../myTypes";
import { IBlock } from "../../types/block";
import { ICustomType, ICustomTypeConfig } from "../../types/customType";
import { KeyOfWithType } from "../../types/keyOfWithType";

type State<T>
    = { state: "LOADING" } 
    | { state: "LOADED"; typeName: string; typeConfig: ICustomTypeConfig<T>; item: ICustomType<T>; prop: KeyOfWithType<T, IBlock>; }
    | { state: "ERROR"; message: string; }

export const useLoadPropOfCustomTypeItem = <T>() => {
    const { typeName, id, prop } = useParams();

    const [state, setState] = useState<State<T>>({ state: "LOADING" });

    useEffect(() => {
        try {
            if (!typeName || !id || !prop) {
                throw new Error("typeConfig or id param is missing");
            }

            const typeConfig = MY_TYPES[typeName];

            if (!typeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const item = getItemOfType(typeName, id) as any;

            if (!item) {
                throw new Error("couldn't find item");
            }

            if (item.data[prop] === undefined) {
                throw new Error("prop doesn't exist in type");
            }

            setState({ state: "LOADED", typeName, typeConfig, item, prop: prop as KeyOfWithType<T, IBlock> });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }, [typeName, id, prop]);

    return state;
};
