import { IBlock } from "./block";

export interface IPage {
    slug: string;
    title: string;
    subtitle: string;
    createdAt: Date;
    updatedAt: Date;
    content: IBlock[];
}

export const isPage = (page: any): page is IPage => {
    return page.slug && page.content;
};
