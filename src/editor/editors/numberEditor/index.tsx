import { IPropEditorProps } from "../../types/propEditor";
import { Input } from "./styles";

export const numberEditorFactory = () => (props: IPropEditorProps<number>) => (
    <Input type="number" value={props.value} onChange={e => props.onChange(e.currentTarget.valueAsNumber)} />
);
