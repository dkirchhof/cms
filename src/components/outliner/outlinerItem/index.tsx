import { BLOCKS } from "../../..";
import { useContext } from "../../../hooks/useContext";
import { IBlock } from "../../../types/block";
import { getPathForChild } from "../../../utils/path";
import { PrimaryButton } from "../../button";
import { BlockLabel, BlockName, ChildList, Tile } from "./styles";

interface IProps {
    block: IBlock;
    path: string;
}

export const OutlinerItem = ({ block, path, ...props }: IProps) => {
    const { addBlock, selectionPath, setSelectionPath } = useContext();

    const blockConfig = BLOCKS[block.blockName];
    const label = blockConfig.getLabel(block.data);
    
    return (
        <div>
            <Tile aria-selected={path === selectionPath} onClick={() => setSelectionPath(path)}>
                <BlockName>{block.blockName}</BlockName>
                <BlockLabel>{label}</BlockLabel>
            </Tile>
            
            {block.data.children && (
                <ChildList>
                    {block.data.children.map((childBlock: any, i: number) => <OutlinerItem key={i} block={childBlock} path={getPathForChild(path, i)} {...props} />)}

                    <PrimaryButton onClick={() => addBlock(path)}>+</PrimaryButton>
                </ChildList>
            )}
        </div>
    );
};
