import { PropEditor } from "../../types/propEditor";
import { Textarea } from "./styles";

export const MultiLineEditor: PropEditor<string> = (props) => (
    <Textarea value={props.value} onChange={e => props.onChange(e.currentTarget.value)} />
);
