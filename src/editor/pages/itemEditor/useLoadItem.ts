import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItemTypeForEditor } from "../../../itemTypeBuilder";
import { EditorFields, IEditorItem } from "../../../itemTypeBuilder/editorField";
import { findItemTypeByName } from "../../../utils/findItemType";
import { createApi } from "../../api";

type State<EDITOR extends EditorFields>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemType: IItemTypeForEditor<EDITOR>; item?: IEditorItem<EDITOR>; }
    | { state: "ERROR"; message: string; }

export const useLoadItem = <EDITOR extends EditorFields>(itemTypes: IItemTypeForEditor<EDITOR>[]) => {
    const { typeName, id } = useParams();

    const [state, setState] = useState<State<EDITOR>>({ state: "LOADING" });
    
    const fetch = async () => {
        try {
            setState({ state: "LOADING" });

            const itemType = findItemTypeByName(itemTypes, typeName!);

            if (!itemType) {
                throw new Error("couldn't find typeConfig");
            }

            if(id === "new") {
                setState({ state: "LOADED", itemType, item: undefined });
            } else {
               const item = await createApi(itemType).getItem(id!);

               setState({ state: "LOADED", itemType, item });
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
