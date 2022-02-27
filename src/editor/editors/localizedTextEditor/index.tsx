import { ChangeEvent } from "react";
import { Localized } from "../../../types/i18n";
import { IPropEditorProps } from "../../types/propEditor";
import { useThrottledValue } from "../visualBlockEditor/hooks/useThrottledValue";
import { Input } from "./styles";

export const localizedTextEditorFactory = () => (props: IPropEditorProps<Localized<string, any>>) => {
    const [value, setValue] = useThrottledValue(props.value, props.onChange, 200);

    const onChange = (lang: string) => (e: ChangeEvent<HTMLInputElement>) => setValue({
        ...value,
        [lang]: e.currentTarget.value,
    });

    return (
        <>
            {Object.entries(value).map(([lang, localizedValue]) => <Input key={lang} value={localizedValue} onChange={onChange(lang)} />)}
        </>
    );
};
