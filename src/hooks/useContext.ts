import { useContext as nativeUseContext } from "react";
import { Context } from "../components/visualEditor";

export const useContext = () => nativeUseContext(Context);
