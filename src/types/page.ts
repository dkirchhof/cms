import { IBlock } from "./block";

export interface IPage {
    slug: string;
    title: string;
    subtitle: string;
    createdAt: Date;
    updatedAt: Date;
    content: IBlock[];
}
