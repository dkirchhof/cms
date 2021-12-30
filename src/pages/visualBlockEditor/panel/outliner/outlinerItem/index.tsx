import { BLOCKS } from "../../../../../blocks";
import { IBlock } from "../../../../../types/block";
import { getPathForChild } from "../../../../../utils/path";
import { BlockLabel, BlockName, ChildList, Tile } from "./styles";

interface IProps {
    path: string;
    block: IBlock;

    selectionPath: string;
    setSelectionPath: (path: string) => void;
}

export const OutlinerItem = ({ block, path, ...props }: IProps) => {
    const blockConfig = BLOCKS[block.blockName];
    const label = blockConfig.getLabel(block.data);
    
    return (
        <div>
            <Tile selected={path === props.selectionPath} onClick={() => props.setSelectionPath(path)}>
                <BlockName>{block.blockName}</BlockName>
                {label && <BlockLabel>{label}</BlockLabel>}
            </Tile>
            
            {block.data.children && (
                <ChildList>
                    {block.data.children.map((childBlock: any, i: number) => <OutlinerItem key={i} block={childBlock} path={getPathForChild(path, i)} {...props} />)}
                </ChildList>
            )}
        </div>
    );
};
