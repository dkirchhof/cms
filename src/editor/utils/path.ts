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

export const getParentPathAndIndex = (path: string) => {
    const parts = path.split(",");
    
    return {
        parentPath: parts.length > 1 ? parts.slice(0, -1).join(",") : null,
        index: Number(parts[parts.length - 1]),
    };
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

export const getPath = (blocks: IBlock[], id: string, path = ""): string => {
    for (let i = 0; i < blocks.length; i++) {
        const myPath = getPathForChild(path, i);

        if (blocks[i].id === id) {
            return myPath;
        }
        
        if (blocks[i].data.children) {
            const childPath = getPath(blocks[i].data.children!, id, myPath);

            if (childPath) {
                return childPath;
            }
        }
    }

    return "";
};
