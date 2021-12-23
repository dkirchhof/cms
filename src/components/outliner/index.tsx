import { useContext } from "../../hooks/useContext";
import { IBlock } from "../../types/block";
import { getPathForChild } from "../../utils/path";
import { PrimaryButton } from "../button";
import { OutlinerItem } from "./outlinerItem";
import { Container } from "./styles";

interface IProps {
    content: IBlock[];
}

export const Outliner = (props: IProps) => {
    const { addBlock } = useContext();

    const path = "";

    return (
        <Container>
            {props.content.map((block, i) => <OutlinerItem key={i} path={getPathForChild(path, i)} block={block} />)}

            <PrimaryButton onClick={() => addBlock(path)}>+</PrimaryButton>
        </Container>
    );
};
