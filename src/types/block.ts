import { PropEditor } from "./propEditor";

export interface IBlockComponentProps<DATA> {
    data: DATA;
}

export interface IBlockEditorProps<DATA> {
    data: DATA;
    onChange: <PROP extends keyof DATA>(prop: PROP, value: DATA[PROP]) => void;
}

export type BlockComponent<DATA> = (props: IBlockComponentProps<DATA>) => JSX.Element;
export type GetBlockInitialData<DATA> = () => DATA;
export type GetBlockLabel<DATA> = (data: DATA) => string;
export type GetBlockEditorInputs<DATA> = () => { [prop in keyof Omit<DATA, "children">]: PropEditor<DATA[prop]> };

export interface IBlockConfig<DATA> {
    getInitialData: GetBlockInitialData<DATA>;
    getEditorInputs: GetBlockEditorInputs<DATA>;
    getLabel: GetBlockLabel<DATA>;
    Component: BlockComponent<DATA>;
}

export interface IBlock {
    blockName: string;
    data: { [s: string]: any; children?: IBlock[]; };
}

export const isBlock = (block: any): block is IBlock => {
    return block.blockName;
};
