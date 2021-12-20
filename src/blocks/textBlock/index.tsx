import { MultiLineEditor } from "../../editors/multiLineEditor";
import { BlockComponent, GetBlockEditorInputs, GetBlockInitialData, GetBlockLabel, IBlockConfig } from "../../types/block";
import { P } from "./styles";

interface IData {
    text: string;
}

const getInitialData: GetBlockInitialData<IData> = () => ({
    text: "Lorem ipsum",
});

const getEditorInputs: GetBlockEditorInputs<IData> = () => ({
    text: MultiLineEditor,
});

const getLabel: GetBlockLabel<IData> = data => data.text;

const Component: BlockComponent<IData> = props => (
    <P>{props.data.text}</P> 
);

export const TextBlock: IBlockConfig<IData> = {
    getInitialData,
    getEditorInputs,
    getLabel,
    Component,
};
