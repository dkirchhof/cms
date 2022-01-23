import { IPropEditorProps } from "../../types/propEditor";
import { Input } from "./styles";

export const textEditorFactory = () => (props: IPropEditorProps<string>) => (
    <Input value={props.value} onChange={e => props.onChange(e.currentTarget.value)} />
);
