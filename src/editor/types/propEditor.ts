import { BlockConfigs } from "../../types/block";

export interface IPropEditorProps<VALUE> {
    prop: string;
    value: VALUE;

    blockConfigs: BlockConfigs;

    onChange: (value: VALUE) => void;
}

export type PropEditor<VALUE> = (props: IPropEditorProps<VALUE>) => JSX.Element;
