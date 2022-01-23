import { IPropEditorProps } from "../../types/propEditor";
import { Input } from "./styles";

interface IOptions {
    min?: number;
    max?: number;
    step?: number;
}

export const numberEditorFactory = (options: IOptions) => (props: IPropEditorProps<number>) => (
    <Input type="number" value={props.value} min={options.min} max={options.max} step={options.step} onChange={e => props.onChange(e.currentTarget.valueAsNumber)} />
);
