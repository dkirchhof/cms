import { IPropEditorProps } from "../../types/propEditor";
import { useThrottledValue } from "../visualBlockEditor/hooks/useThrottledValue";
import { Input } from "./styles";

interface IOptions {
    min?: number;
    max?: number;
    step?: number;
}

export const numberEditorFactory = (options: IOptions) => (props: IPropEditorProps<number>) => {
    const [value, setValue] = useThrottledValue(props.value, props.onChange, 200);

    return <Input type="number" value={value} min={options.min} max={options.max} step={options.step} onChange={e => setValue(e.currentTarget.valueAsNumber)} />
};
