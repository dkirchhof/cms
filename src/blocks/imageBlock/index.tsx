import { TextEditor } from "../../editors/textEditor";
import { BlockComponent, GetBlockEditorInputs, GetBlockInitialData, GetBlockLabel, IBlockConfig } from "../../types/block";

interface IData {
    alt: string;
    src: string;
}

const getInitialData: GetBlockInitialData<IData> = () => ({
    alt: "",
    src: "",
});

const getEditorInputs: GetBlockEditorInputs<IData> = () => ({
    alt: TextEditor,
    src: TextEditor,
});

const getLabel: GetBlockLabel<IData> = data => data.alt || data.src;

const Component: BlockComponent<IData> = props => (
    <img src={props.data.src} alt={props.data.alt} />
);

export const ImageBlock: IBlockConfig<IData> = {
    getInitialData,
    getEditorInputs,
    getLabel,
    Component,
};
