import { IBlock } from "../../../../../../types/block";
import { findBlockConfigByName } from "../../../../../../utils/findBlockConfig";
import { useContextMenu } from "../../../../../components/contextMenu";
import { CTX_MENU_ADD_CHILD_BLOCK_FIRST, CTX_MENU_ADD_CHILD_BLOCK_LAST, CTX_MENU_ADD_SIBLING_BLOCK_AFTER, CTX_MENU_ADD_SIBLING_BLOCK_BEFORE, CTX_MENU_DELETE, CTX_MENU_EDIT } from "../../../../../messages";
import { getPathForChild } from "../../../../../utils/path";
import { useCMS } from "../../../hooks/useCMS";
import { BlockLabel, BlockName, ChildList, Tile } from "./styles";

interface IProps {
    path: string;
    block: IBlock;
}

export const OutlinerItem = ({ block, path, ...props }: IProps) => {
    const cms = useCMS();

    const blockConfig = findBlockConfigByName(cms.blockConfigs, block.blockName);

    if (!blockConfig) {
        throw new Error("couldn't find blockConfig");
    }

    const { ContextMenu, openContextMenu } = useContextMenu([
        [
            { label: CTX_MENU_EDIT, action: () => cms.setSelection({ id: block.id, path }) },
        ],
        [
            { label: CTX_MENU_ADD_SIBLING_BLOCK_BEFORE, action: () => cms.setSelection({ id: block.id, path }) },
            { label: CTX_MENU_ADD_SIBLING_BLOCK_AFTER, action: () => cms.setSelection({ id: block.id, path }) },
            block.data.children  && { label: CTX_MENU_ADD_CHILD_BLOCK_FIRST, action: () => cms.setSelection({ id: block.id, path }) },
            block.data.children && { label: CTX_MENU_ADD_CHILD_BLOCK_LAST, action: () => cms.setSelection({ id: block.id, path }) },
        ],
        [
            { label: CTX_MENU_DELETE, action: () => cms.removeBlock(path) },
        ],
    ]);

    const label = blockConfig.toString(block.data);

    return (
        <div>
            <Tile selected={cms.selection ? block.id === cms.selection.id : false} onClick={() => cms.setSelection({ id: block.id, path })} onContextMenu={openContextMenu}>
                <BlockName>{block.blockName}</BlockName>
                {label && <BlockLabel>{label}</BlockLabel>}

                <ContextMenu />
            </Tile>

            {block.data.children && (
                <ChildList>
                    {block.data.children.map((childBlock, i) => {
                        const childPath = getPathForChild(path, i);

                        return (
                            <OutlinerItem 
                                key={childPath}
                                block={childBlock} 
                                path={childPath} 
                                {...props} 
                            />
                        );
                    })}
                </ChildList>
            )}
        </div>
    );
};
