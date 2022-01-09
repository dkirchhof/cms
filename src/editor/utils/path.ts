import { IBlock } from "../../types/block";

export const getPathForChild = (currentPath: string, childIndex: number) => {
    if (currentPath) {
        return `${currentPath},${childIndex}`;
    }

    return childIndex.toString();
};

export const getPathForParent = (path: string) => {
    return path.split(",").slice(0, -1).join(",");
};

export const getIndex = (path: string) => {
    return Number(path.split(",").pop());
};

export const traversePath = (block: IBlock, path: string) => {
    if (!path) {
        return block;
    }

    const traversePathRec = (blocks: IBlock[], path: number[]): IBlock => {
        const first = path.shift()!;

        if (!path.length) {
            return blocks[first];
        }

        return traversePathRec(blocks[first].data.children!, path);
    };

    return traversePathRec(block.data.children!, path.split(",").map(Number));
};
