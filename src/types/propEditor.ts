export interface IPropEditorProps<VALUE> {
    prop: string;
    value: VALUE;

    onChange: (value: VALUE) => void;
}

export type PropEditor<VALUE> = (props: IPropEditorProps<VALUE>) => JSX.Element;
