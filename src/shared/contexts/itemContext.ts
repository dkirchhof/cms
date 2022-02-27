import { createContext } from "react";
// import { IEditorField } from "../../editor/pages/itemEditor";

type Type 
    = { type: "ITEM"; item: any; }
    | { type: "EDITOR_FIELDS"; editorFields: any; }

export const ItemContext = createContext<Type>(null as any);
