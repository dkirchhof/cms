import { IDeserializedBlock } from "../types/block";

export const renderChildren = (children: IDeserializedBlock[]) => {
    return children.map((block, i) => <block.Component key={i} data={block.data} />);
};
