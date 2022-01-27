import { BlockConfigs, IBlock } from "../../../../../types/block";
import { getPathForChild } from "../../../../utils/path";
import { OutlinerItem } from "./outlinerItem";
import { Container } from "./styles";

interface IProps {
    blockConfigs: BlockConfigs;
    blocks: IBlock[];
}

export const Outliner = (props: IProps) => {
    return (
        <Container>
            {props.blocks.map((block, i) => {
                const path = getPathForChild("", i);

                return (
                    <OutlinerItem 
                        key={path}
                        blockConfigs={props.blockConfigs}
                        block={block}
                        path={path}
                    />
                );
            })}
        </Container>
    );
};
