import { IPropEditorProps } from "../../types/propEditor";
import { useThrottledValue } from "../visualBlockEditor/hooks/useThrottledValue";
import { Input } from "./styles";

export const dateEditorFactory = () => (props: IPropEditorProps<string | null>) => {
    const [value, setValue] = useThrottledValue(props.value, props.onChange, 200);

    <Input type="date" value={value ? value : ""} onChange={e => setValue(e.currentTarget.value ? e.currentTarget.value : null)} />
};
