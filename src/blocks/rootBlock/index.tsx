import { IBlockConfig, IBlock } from "../../types/block";
import { renderChildren } from "../../utils/renderChildren";

interface IData {
    children: IBlock[];
}

export const RootBlock: IBlockConfig<IData> = {
    getInitialData: () => ({
        children: [],
    }),

    getEditorInputs: () => ({}),

    getLabel: _data => "",

    Component: props => (
        <>
            {renderChildren(props.data.children)}
        </>
    ),
};
