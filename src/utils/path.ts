import { IBlock } from "../types/block";
import { IPage } from "../types/page";

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

export const traversePath = (page: IPage, path: string) => {
    if (!path) {
        return page;
    }

    const traversePathRec = (blocks: IBlock[], path: number[]): IBlock => {
        const first = path.shift()!;

        if (!path.length) {
            return blocks[first];
        }

        return traversePathRec(blocks[first].data.children!, path);
    };

    return traversePathRec(page.content, path.split(",").map(Number));
};
