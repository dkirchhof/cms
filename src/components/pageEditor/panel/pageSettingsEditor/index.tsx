import { IPage } from "../../../../types/page";

interface IProps {
    page: IPage;

    onChange: (prop: string) => (value: any) => void;
    addBlock: () => void;
    removeBlock: () => void;
}

export const PageSettingsEditor = (props: IProps) => <div>Page Editor</div>;
