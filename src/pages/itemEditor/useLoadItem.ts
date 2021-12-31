import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../../api";
import { MY_TYPES } from "../../myTypes";
import { ICustomType, ICustomTypeConfig } from "../../types/customType";

type State<T>
    = { state: "LOADING" } 
    | { state: "LOADED"; typeName: string; typeConfig: ICustomTypeConfig<T>; item: ICustomType<T>; }
    | { state: "ERROR"; message: string; }

export const useLoadItem = <T>() => {
    const { typeName, id } = useParams();

    const [state, setState] = useState<State<T>>({ state: "LOADING" });
    
    const fetch = async () => {
        try {
            if (!typeName || !id) {
                throw new Error("typeConfig or id param is missing");
            }

            const typeConfig = MY_TYPES[typeName];

            if (!typeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const item = await getItem<T>(typeName, id);

            if (!item) {
                throw new Error("couldn't find item");
            }

            setState({ state: "LOADED", typeName, typeConfig, item });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }

    useEffect(() => {
        fetch();
    }, [typeName, id]);

    return state;
};
