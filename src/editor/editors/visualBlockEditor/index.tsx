import { IBlock } from "../../../types/block";
import { VisualBlockEditor as Editor } from "../../pages/visualBlockEditor";
import { PropEditor } from "../../types/propEditor";

export const VisualBlockEditor: PropEditor<IBlock> = props => {
    return (
        <Editor blockConfigs={props.blockConfigs} root={props.value} />
    );
};
