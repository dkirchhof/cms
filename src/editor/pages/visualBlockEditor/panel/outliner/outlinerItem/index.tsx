import { BlockConfigs, IBlock } from "../../../../../types/block";
import { findBlockConfigByName } from "../../../../../utils/findBlockConfig";
import { getPathForChild } from "../../../../../utils/path";
import { BlockLabel, BlockName, ChildList, Tile } from "./styles";

interface IProps {
    path: string;
    block: IBlock;
    blockConfigs: BlockConfigs;

    selectionPath: string;
    setSelectionPath: (path: string) => void;
}

export const OutlinerItem = ({ block, path, ...props }: IProps) => {
    const blockConfig = findBlockConfigByName(props.blockConfigs, block.blockName);

    if (!blockConfig) {
        throw new Error("couldn't find blockConfig");
    }

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
