import { IBlock } from "../types/block";

export const getPathForChild = (currentPath: string, childIndex: number) => {
    if (currentPath) {
        return `${currentPath},${childIndex}`;
    }

    return childIndex.toString();
};

export const traversePath = (blocks: IBlock[], path: string) => {
    if (!path) {
        return null;
    }

    return traversePathRec(blocks, path.split(",").map(Number));
};

const traversePathRec = (blocks: IBlock[], path: number[]): IBlock => {
    const first = path.shift()!;

    if (!path.length) {
        return blocks[first];
    }

    return traversePathRec(blocks[first].data.children!, path);
};
