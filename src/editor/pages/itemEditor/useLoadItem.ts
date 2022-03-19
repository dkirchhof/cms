import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItemTypeConfigForEditor } from "../../../itemTypeBuilder";
import { EditorFields, IEditorItem } from "../../../itemTypeBuilder/editorField";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";

type State<EDITOR extends EditorFields>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfigForEditor<EDITOR>; item?: IEditorItem<EDITOR>; }
    | { state: "ERROR"; message: string; }

export const useLoadItem = <EDITOR extends EditorFields>(itemTypeConfigs: IItemTypeConfigForEditor<EDITOR>[]) => {
    const { typeName, id } = useParams();

    const [state, setState] = useState<State<EDITOR>>({ state: "LOADING" });
    
    const fetch = async () => {
        try {
            setState({ state: "LOADING" });

            const itemTypeConfig = findItemConfigByName(itemTypeConfigs, typeName!);

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            if(id === "new") {
                setState({ state: "LOADED", itemTypeConfig, item: undefined });
            } else {
               const item = await itemTypeConfig.api.getItem(id!);

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
