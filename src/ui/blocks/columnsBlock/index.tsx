import { NumberEditor } from "../../editors/numberEditor";
import { IBlockConfig, IBlock } from "../../types/block";
import { renderChildren } from "../../utils/renderChildren";
import { ColumnsContainer } from "./styles";

interface IData {
    gap: number;
    children: IBlock[];
}

export const ColumnsBlock: IBlockConfig<IData> = {
    getInitialData: () => ({
        gap: 0,
        children: [],
    }),

    getEditorInputs: () => ({
        gap: NumberEditor,
    }),

    getLabel: data => `columns: ${data.children.length}`,

    Component: props => (
        <ColumnsContainer gap={props.data.gap}>
            {renderChildren(props.data.children)}
        </ColumnsContainer>
    ),
};
