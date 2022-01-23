import { PropEditor } from "../editor/types/propEditor";

export type BlockConfigs = IBlockConfig<any, any>[];

export interface IBlockComponentProps<CTX, DATA> {
    blockConfigs: BlockConfigs;
    ctx: CTX;
    data: DATA;
}

export interface IBlockEditorProps<DATA> {
    data: DATA;
    onChange: <PROP extends keyof DATA>(prop: PROP, value: DATA[PROP]) => void;
}

export interface IPropConfig<T> {
    // label?: string;
    editor: PropEditor<T> | null;
    defaultValue: T;
    // validators: PropValidator<T>[];
}

export type BlockComponent<CTX, DATA> = (props: IBlockComponentProps<CTX, DATA>) => JSX.Element;
export type GetBlockInitialData<DATA> = () => DATA;
export type GetBlockLabel<DATA> = (data: DATA) => string;
export type GetBlockEditorInputs<DATA> = () => { [prop in keyof Omit<DATA, "children">]: PropEditor<DATA[prop]> };

export interface IBlockConfig<CTX, DATA> {
    name: string;
    toString: (data: DATA) => string;

    propConfigs: {
        [prop in keyof DATA]: IPropConfig<DATA[prop]>;
    };

    Component: BlockComponent<CTX, DATA>;
}

export interface IBlock {
    blockName: string;
    data: { [s: string]: any; children?: IBlock[]; };
}

export const isBlock = (block: any): block is IBlock => {
    return block.blockName;
};
