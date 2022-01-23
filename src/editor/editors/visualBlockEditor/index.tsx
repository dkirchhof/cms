import { BlockConfigs, IBlock } from "../../../types/block";
import { VisualBlockEditor as Editor } from "../../pages/visualBlockEditor";
import { IPropEditorProps } from "../../types/propEditor";

interface IOptions {
    blockConfigs: BlockConfigs;
}

export const visualBlockEditorFactory = (options: IOptions) => (props: IPropEditorProps<IBlock>) => {
    return (
        <Editor blockConfigs={options.blockConfigs} root={props.value} />
    );
};
