import { useContext as nativeUseContext } from "react";
import { Context } from "../components/pageEditor";

export const useContext = () => nativeUseContext(Context);
