import { IPropEditorProps } from "../../types/propEditor";
import { useThrottledValue } from "../visualBlockEditor/hooks/useThrottledValue";
import { Input } from "./styles";

export const textEditorFactory = () => (props: IPropEditorProps<string>) => {
    const [value, setValue] = useThrottledValue(props.value, props.onChange, 200);

    return <Input value={value} onChange={e => setValue(e.currentTarget.value)} />
};
