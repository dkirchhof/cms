import { IBlock } from "../../../../types/block";
import { traversePath } from "../../../utils/path";
import { useCMS } from "../hooks/useCMS";
import { BlockEditor } from "./blockEditor";
import { Outliner } from "./outliner";
import { Container } from "./styles";

interface IProps {
    blocks: IBlock[];

    changeData: (path: string) => (prop: string) => (value: any) => void;
}

export const Panel = (props: IProps) => {
    const cms = useCMS();

    const selected = cms.selection && traversePath(props.blocks, cms.selection);

    return (
        <Container>
            <Outliner blocks={props.blocks} />

            {selected && <BlockEditor block={selected} onChange={props.changeData(cms.selection!)} />}
        </Container>
    );
};
