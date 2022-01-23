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

type TraverseEmpty = (blocks: IBlock[], path: "") => null;
type TraverseNonEmpty = (blocks: IBlock[], path: string) => IBlock;

export const traversePath = ((blocks, path) => {
    if (path === "") {
        return null;
    }

    const traversePathRec = (blocks: IBlock[], path: number[]): IBlock => {
        const first = path.shift()!;

        if (!path.length) {
            return blocks[first];
        }

        return traversePathRec(blocks[first].data.children!, path);
    };

    return traversePathRec(blocks, path.split(",").map(Number));
}) as (TraverseEmpty & TraverseNonEmpty);
