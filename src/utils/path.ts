import { IDeserializedBlock } from "../types/block";

export const getPathForChild = (currentPath: string, childIndex: number) => {
    if (currentPath) {
        return `${currentPath},${childIndex}`;
    }

    return childIndex.toString();
};

export const traversePath = (blocks: IDeserializedBlock[], path: string) => {
    if (!path) {
        return null;
    }

    return traversePathRec(blocks, path.split(",").map(Number));
};

const traversePathRec = (blocks: IDeserializedBlock[], path: number[]): IDeserializedBlock => {
    const first = path.shift()!;

    if (!path.length) {
        return blocks[first];
    }

    return traversePathRec(blocks[first].data.children!, path);
};
