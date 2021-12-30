import update from "immer";
import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { match } from "ts-pattern";
import { ColumnsBlock } from "../../blocks/columnsBlock";
import { HeaderBlock } from "../../blocks/headerBlock";
import { HeadingBlock } from "../../blocks/headingBlock";
import { ImageBlock } from "../../blocks/imageBlock";
import { MaxWidthBlock } from "../../blocks/maxWidthBlock";
import { RootBlock } from "../../blocks/rootBlock";
import { TextBlock } from "../../blocks/textBlock";
import { BUTTON_RESET, BUTTON_SAVE } from "../../messages";
import { IBlockConfig, IBlock } from "../../types/block";
import { ICustomTypeConfig } from "../../types/customType";
import { IPage } from "../../types/page";
import { traversePath } from "../../utils/path";
import { Breadcrumb } from "../breadcrumb";
import { PrimaryButton, SecondaryButton } from "../button";
import { Panel } from "./panel";
import { Preview } from "./preview";
import { Container, Header, Main } from "./styles";
import { useLoadPropOfCustomTypeItem } from "./useLoadPropOfCustomTypeItem";

export type BlocksMap = { [s: string]: IBlockConfig<any>; }

export const BLOCKS: BlocksMap = {
    "Root": RootBlock,
    "HeaderBlock": HeaderBlock,
    "HeadingBlock": HeadingBlock,
    "TextBlock": TextBlock,
    "ImageBlock": ImageBlock,
    "MaxWidthBlock": MaxWidthBlock,
    "ColumnsBlock": ColumnsBlock,
};

const TEST_PAGE: IPage = {
    slug: "test-page",
    title: "title",
    subtitle: "subtitle",
    createdAt: new Date(),
    updatedAt: new Date(),
    content: [],
};

interface IAdminContext {
    page: IPage;
}

export const Context = createContext<IAdminContext>({} as any);

export const VisualEditor = () => {
    const state = useLoadPropOfCustomTypeItem();

    return match(state)
        .with({ state: "LOADING" }, () => <LoadingVisualEditor />)
        .with({ state: "LOADED" }, ({ typeConfig, item, prop }) => <LoadedVisualEditor typeConfig={typeConfig} item={item} prop={prop} />)
        .with({ state: "ERROR" }, ({ message }) => <ErrorVisualEditor message={message} />)
        .exhaustive();
};

const LoadingVisualEditor = () => {
    return (
        <Container>Loading...</Container>
    );
};

const LoadedVisualEditor = <T extends { id: string; }>(props: { typeConfig: ICustomTypeConfig<T>; item: T; prop: keyof T }) => {
    const [value, setValue] = useState<IBlock>(props.item[props.prop] as any);

    const changeData = (path: string) => (prop: string) => (dataValue: any) => {
        setValue(
            update(value => {
                traversePath(value, path).data[prop] = dataValue;
            }, value)
        );
    };

    const addBlock = (path: string) => (block: IBlock) => {
        setValue(
            update(value => {
                traversePath(value, path).data.children!.push(block);
            }, value)
        );
    };

    const removeBlock = (parentPath: string, index: number) => {
        setValue(
            update(value => {
                traversePath(value, parentPath).data.children!.splice(index, 1);
            }, value)
        );
    };

    return (
        <Context.Provider value={{ page: TEST_PAGE }}>
            <Container>
                <Header>
                    <Breadcrumb crumbs={[
                        { urlSegment: props.typeConfig.pluralName, label: props.typeConfig.pluralName },
                        { urlSegment: props.item.id, label: props.typeConfig.getLabel(props.item) },
                        { label: props.prop.toString() },
                    ]}/>

                    <SecondaryButton>{BUTTON_RESET}</SecondaryButton>
                    <PrimaryButton>{BUTTON_SAVE}</PrimaryButton>
                </Header>

                <Main>
                    <Preview root={value} />
                    <Panel root={value} changeData={changeData} addBlock={addBlock} removeBlock={removeBlock} />
                </Main>
            </Container>
        </Context.Provider>
    );
};

const ErrorVisualEditor = (props: { message: string; }) => {
    return (
        <Navigate to="/404" replace />
    );
};
