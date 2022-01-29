import { IBlock } from "../../../../../types/block";
import { getPathForChild } from "../../../../utils/path";
import { OutlinerItem } from "./outlinerItem";
import { Container } from "./styles";

interface IProps {
    blocks: IBlock[];
}

export const Outliner = (props: IProps) => {
    return (
        <Container>
            {props.blocks.map((block, i) => {
                const path = getPathForChild(null, i);

                return <OutlinerItem key={path} block={block} path={path} />;
            })}
        </Container>
    );
};
