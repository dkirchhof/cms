import { useContext as nativeUseContext } from "react";
import { Context } from "../pages/visualEditor";

export const useContext = () => nativeUseContext(Context);
