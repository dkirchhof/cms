import { BLOCKS } from "../../..";
import { IBlock } from "../../../types/block";
import { getPathForChild } from "../../../utils/path";
import { PrimaryButton } from "../../button";
import { BlockLabel, BlockName, ChildList, Tile } from "./styles";

interface IProps {
    block: IBlock;
    path: string;
    currentSelectionPath: string;

    addNewBlock: (path: string) => void;
    selectBlock: (path: string) => void;
}

export const OutlinerItem = ({ block, path, ...props }: IProps) => {
    const blockConfig = BLOCKS[block.blockName];
    const label = blockConfig.getLabel(block.data);
    
    return (
        <div>
            <Tile aria-selected={path === props.currentSelectionPath} onClick={() => props.selectBlock(path)}>
                <BlockName>{block.blockName}</BlockName>
                <BlockLabel>{label}</BlockLabel>
            </Tile>
            
            {block.data.children && (
                <ChildList>
                    {block.data.children.map((childBlock: any, i: number) => <OutlinerItem key={i} block={childBlock} path={getPathForChild(path, i)} {...props} />)}

                    <PrimaryButton onClick={() => props.addNewBlock(path)}>+</PrimaryButton>
                </ChildList>
            )}
        </div>
    );
};
