import { PropEditor } from "../../types/propEditor";
import { Input } from "./styles";

export const NumberEditor: PropEditor<number> = (props) => (
    <Input type="number" value={props.value} onChange={e => props.onChange(e.currentTarget.valueAsNumber)} />
);
