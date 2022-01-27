import { createContext } from "react";
import { Selection } from "../types";

export interface ICMSContext {
    selection: Selection;
    setSelection: (selection: Selection) => void;

    removeBlock: (path: string) => void;
}

export const CMSContext = createContext<ICMSContext>(null as any);
