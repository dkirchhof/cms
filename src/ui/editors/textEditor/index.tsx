import { PropEditor } from "../../types/propEditor";
import { Input } from "./styles";

export const TextEditor: PropEditor<string> = (props) => (
    <Input value={props.value} onChange={e => props.onChange(e.currentTarget.value)} />
);
