import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemsOfType } from "../../myDatabaseService";
import { MY_TYPES } from "../../myTypes";
import { ICustomType, ICustomTypeConfig } from "../../types/customType";

type State<T>
    = { state: "LOADING" } 
    | { state: "LOADED"; typeName: string; typeConfig: ICustomTypeConfig<T>; items: ICustomType<T>[]; }
    | { state: "ERROR"; message: string; }

export const useLoadItemsOfType = <T>() => {
    const { typeName } = useParams();

    const [state, setState] = useState<State<T>>({ state: "LOADING" });

    useEffect(() => {
        try {
            if (!typeName) {
                throw new Error("typeConfig param is missing");
            }

            const typeConfig = MY_TYPES[typeName];

            if (!typeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const items = getItemsOfType(typeName) as any;

            setState({ state: "LOADED", typeName, typeConfig, items });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }, [typeName]);

    return state;
};
