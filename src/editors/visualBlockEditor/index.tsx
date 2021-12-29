import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/button";
import { OPEN_VISUAL_EDITOR } from "../../messages";
import { IBlock } from "../../types/block";
import { PropEditor } from "../../types/propEditor";

export const VisualBlockEditor: PropEditor<IBlock> = (props) => (
    <Link to={props.prop}>
        <PrimaryButton>{OPEN_VISUAL_EDITOR}</PrimaryButton>
    </Link>
);
