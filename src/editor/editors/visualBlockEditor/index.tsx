import { IBlock } from "../../../types/block";
import { loadedVisualEditorFactory } from "../../pages/visualBlockEditor";
import { PropEditor } from "../../types/propEditor";

export const VisualBlockEditor: PropEditor<IBlock> = props => {
    const VisualBlockEditor = loadedVisualEditorFactory(props.blockConfigs);

    return (
        <VisualBlockEditor root={props.value} />
    );
};
