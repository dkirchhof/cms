import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemOfType } from "../../myDatabaseService";
import { MY_TYPES } from "../../myTypes";
import { ICustomTypeConfig } from "../../types/customType";

type State<T extends { id: string; }>
    = { state: "LOADING" } 
    | { state: "LOADED"; typeName: string; typeConfig: ICustomTypeConfig<T>; item: T; }
    | { state: "ERROR"; message: string; }

export const useLoadItem = () => {
    const { typeName, id } = useParams();

    const [state, setState] = useState<State<any>>({ state: "LOADING" });

    useEffect(() => {
        try {
            if (!typeName || !id) {
                throw new Error("typeConfig or id param is missing");
            }

            const typeConfig = MY_TYPES[typeName];

            if (!typeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const item = getItemOfType(typeName, id);

            if (!item) {
                throw new Error("couldn't find item");
            }

            setState({ state: "LOADED", typeName, typeConfig, item });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }, [typeName, id]);

    return state;
};
