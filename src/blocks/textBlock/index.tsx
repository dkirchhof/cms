import { MultiLineEditor } from "../../editors/multiLineEditor";
import { IBlockConfig } from "../../types/block";
import { P } from "./styles";

interface IData {
    text: string;
}

export const TextBlock: IBlockConfig<IData> = {
    getInitialData: () => ({
        text: "Lorem ipsum",
    }),

    getEditorInputs: () => ({
        text: MultiLineEditor,
    }),

    getLabel: data => data.text,

    Component: props => (
        <P>{props.data.text}</P>
    ),
};
