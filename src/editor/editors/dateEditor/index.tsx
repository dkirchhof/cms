import { PropEditor } from "../../types/propEditor";
import { Input } from "./styles";

export const DateEditor: PropEditor<string | null> = (props) => (
    <Input type="date" value={props.value ? props.value : ""} onChange={e => props.onChange(e.currentTarget.value ? e.currentTarget.value : null)} />
);
