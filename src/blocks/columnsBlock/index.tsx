import { NumberEditor } from "../../editors/numberEditor";
import { BlockComponent, GetBlockEditorInputs, GetBlockInitialData, GetBlockLabel, IBlockConfig, IDeserializedBlock } from "../../types/block";
import { renderChildren } from "../../utils/renderChildren";
import { ColumnsContainer } from "./styles";

interface IData {
    gap: number;
    children: IDeserializedBlock[];
}

const getInitialData: GetBlockInitialData<IData> = () => ({
    gap: 0,
    children: [],
});

const getEditorInputs: GetBlockEditorInputs<IData> = () => ({
    gap: NumberEditor,
});

const getLabel: GetBlockLabel<IData> = data => `columns: ${data.children.length}`;

const Component: BlockComponent<IData> = props => (
    <ColumnsContainer gap={props.data.gap}>
        {renderChildren(props.data.children)}
    </ColumnsContainer>
);

export const ColumnsBlock: IBlockConfig<IData> = {
    getInitialData,
    getEditorInputs,
    getLabel,
    Component,
};
