import { IBlock } from "../../../../types/block";
import { renderChildren } from "../../../../utils/renderChildren";
import { useCMS } from "../hooks/useCMS";
import { Container } from "./styles";

interface IProps {
    ctx: any;
    blocks: IBlock[];
}

export const Preview = (props: IProps) => {
    const cms = useCMS();
    
    return (
        <Container>
            {renderChildren(cms.blockConfigs, props.ctx, props.blocks)}
        </Container>
    );
};
