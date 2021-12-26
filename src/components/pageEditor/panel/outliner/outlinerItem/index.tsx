import { IBlock } from "../../../../../types/block";
import { IPage } from "../../../../../types/page";
import { getPathForChild } from "../../../../../utils/path";
import { BLOCKS } from "../../../../pageEditor";
import { BlockLabel, BlockName, ChildList, Tile } from "./styles";

interface IOutlinerItemProps {
    path: string;

    selectionPath: string;
    setSelectionPath: (path: string) => void;
}

interface IRootOutlinerItemProps extends IOutlinerItemProps {
    page: IPage;
}

export const RootOutlinerItem = ({ page, path, ...props }: IRootOutlinerItemProps) => {
    return (
        <div>
            <Tile selected={path === props.selectionPath} onClick={() => props.setSelectionPath(path)}>
                <BlockName>Page</BlockName>
            </Tile>

            <ChildList>
                {page.content.map((childBlock: any, i: number) => <BlockOutlinerItem key={i} block={childBlock} path={getPathForChild(path, i)} {...props} />)}
            </ChildList>
        </div>
    );
};

interface IBlockOutlinerItemProps extends IOutlinerItemProps {
    block: IBlock;
}

const BlockOutlinerItem = ({ block, path, ...props }: IBlockOutlinerItemProps) => {
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
                    {block.data.children.map((childBlock: any, i: number) => <BlockOutlinerItem key={i} block={childBlock} path={getPathForChild(path, i)} {...props} />)}
                </ChildList>
            )}
        </div>
    );
};
