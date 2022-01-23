import { IPropEditorProps } from "../../types/propEditor";
import { Textarea } from "./styles";

export const multiLineEditorFactory = () => (props: IPropEditorProps<string>) => (
    <Textarea value={props.value} onChange={e => props.onChange(e.currentTarget.value)} />
);
