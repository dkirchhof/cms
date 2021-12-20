import { IDeserializedBlock } from "../../types/block";
import { getPathForChild } from "../../utils/path";
import { PrimaryButton } from "../button";
import { BlockLabel, BlockName, Container, Tile, ChildList, ItemContainer } from "./styles";

interface IProps {
    content: IDeserializedBlock[];
    currentSelectionPath: string;

    addNewBlock: (path: string) => void;
    selectBlock: (path: string) => void;
}

export const Outliner = ({ content, ...props }: IProps) => {
    return (
        <Container>
            {content.map((block, i) => <Item key={i} path={i.toString()} block={block} {...props} />)}

            <PrimaryButton onClick={() => props.addNewBlock("")}>+</PrimaryButton>
        </Container>
    );
};

interface IItemProps {
    block: IDeserializedBlock;
    path: string;
    currentSelectionPath: string;

    addNewBlock: (path: string) => void;
    selectBlock: (path: string) => void;
}

const Item = ({ block, path, ...props }: IItemProps) => {
    const label = block.getLabel(block.data);
    
    return (
        <ItemContainer>
            <Tile aria-selected={path === props.currentSelectionPath} onClick={() => props.selectBlock(path)}>
                <BlockName>{block.blockName}</BlockName>
                {label && <BlockLabel>{label}</BlockLabel>}

            </Tile>
            
            {block.data.children && (
                <ChildList>
                    {block.data.children.map((childBlock: any, i: number) => <Item key={i} block={childBlock} path={getPathForChild(path, i)} {...props} />)}

                    <PrimaryButton onClick={() => props.addNewBlock(path)}>+</PrimaryButton>
                </ChildList>
            )}
        </ItemContainer>
    );
};
