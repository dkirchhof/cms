import { IPropEditorProps } from "../../types/propEditor";
import { useThrottledValue } from "../visualBlockEditor/hooks/useThrottledValue";
import { Textarea } from "./styles";

export const multiLineEditorFactory = () => (props: IPropEditorProps<string>) => {
    const [value, setValue] = useThrottledValue(props.value, props.onChange, 200);

    return <Textarea value={value} onChange={e => setValue(e.currentTarget.value)} />
};
