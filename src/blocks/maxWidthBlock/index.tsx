import { NumberEditor } from "../../editors/numberEditor";
import { IBlockConfig, IBlock } from "../../types/block";
import { renderChildren } from "../../utils/renderChildren";
import { Container } from "./styles";

interface IData {
    maxWidth: number;
    children: IBlock[];
}

export const MaxWidthBlock: IBlockConfig<IData> = {
    getInitialData: () => ({
        maxWidth: 800,
        children: [],
    }),

    getEditorInputs: () => ({
        maxWidth: NumberEditor,
    }),

    getLabel: data => data.maxWidth.toString(),

    Component: props => (
        <Container maxWidth={props.data.maxWidth}>
            {renderChildren(props.data.children)}
        </Container>
    ),
};
