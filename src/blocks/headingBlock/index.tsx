import { TextEditor } from "../../editors/textEditor";
import { BlockComponent, GetBlockEditorInputs, GetBlockInitialData, GetBlockLabel, IBlockConfig } from "../../types/block";

interface IData {
    text: string;
}

const getInitialData: GetBlockInitialData<IData> = () => ({
    text: "Heading",
});

const getEditorInputs: GetBlockEditorInputs<IData> = () => ({
    text: TextEditor,
});

const getLabel: GetBlockLabel<IData> = data => data.text;

const Component: BlockComponent<IData> = props => (
    <h1>{props.data.text}</h1> 
);

export const HeadingBlock: IBlockConfig<IData> = {
    getInitialData,
    getEditorInputs,
    getLabel,
    Component,
};
