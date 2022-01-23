import update from "immer";
import { BlockConfigs, IBlock } from "../../../types/block";
import { IPropEditorProps } from "../../types/propEditor";
import { traversePath } from "../../utils/path";
import { Panel } from "./panel";
import { Preview } from "./preview";
import { Container } from "./styles";

interface IOptions {
    blockConfigs: BlockConfigs;
}

export const visualBlockEditorFactory = (options: IOptions) => (props: IPropEditorProps<IBlock[]>) => {
    const changeData = (path: string) => (prop: string) => (dataValue: any) => {
        if (path === "") {
            return;
        }

        const newValue = update(value => {
            traversePath(value, path).data[prop] = dataValue;
        }, props.value)();

        props.onChange(newValue);
    };

    const addBlock = (path: string) => (block: IBlock) => {
        // setValue(
        //     update(value => {
        //         traversePath(value, path).data.children!.push(block);
        //     }, value)
        // );
    };

    const removeBlock = (parentPath: string, index: number) => {
        // setValue(
        //     update(value => {
        //         traversePath(value, parentPath).data.children!.splice(index, 1);
        //     }, value)
        // );
    };

    return (
        <Container>
            <Preview blockConfigs={options.blockConfigs} blocks={props.value} ctx={{}} />
            <Panel blockConfigs={options.blockConfigs} blocks={props.value} changeData={changeData} addBlock={addBlock} removeBlock={removeBlock} />
        </Container>
    );
};
