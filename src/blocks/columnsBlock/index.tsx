import { NumberEditor } from "../../editors/numberEditor";
import { BlockComponent, GetBlockEditorInputs, GetBlockInitialData, GetBlockLabel, IBlockConfig, IDeserializedBlock } from "../../types/block";

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
    <div style={{ display: "flex", gap: `${props.data.gap}px` }}>
        {props.data.children.map((block, i) => <block.Component key={i} data={block.data} />)}
    </div>
);

export const ColumnsBlock: IBlockConfig<IData> = {
    getInitialData,
    getEditorInputs,
    getLabel,
    Component,
};
