import { IPropEditorProps } from "../../types/propEditor";
import { Input } from "./styles";

export const dateEditorFactory = () => (props: IPropEditorProps<string | null>) => (
    <Input type = "date" value = {props.value ?props.value : ""} onChange = { e => props.onChange(e.currentTarget.value ? e.currentTarget.value : null) } />
);
