import { TextEditor } from "../../editors/textEditor";
import { IBlockConfig } from "../../types/block";

interface IData {
    text: string;
}

export const HeadingBlock: IBlockConfig<IData> = {
    getInitialData: () => ({
        text: "Heading",
    }),

    getEditorInputs: () => ({
        text: TextEditor,
    }),

    getLabel: data => data.text,

    Component: props => (
        <h1>{props.data.text}</h1>
    ),
};
