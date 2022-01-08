import update from "immer";
import { createContext, useContext, useState } from "react";
import { match } from "ts-pattern";
import { FullType, IItemTypeConfig, ItemTypeConfigs } from "../../../shared/types/itemTypeConfig";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { BUTTON_RESET, BUTTON_SAVE } from "../../messages";
import { IBlock } from "../../types/block";
import { KeyOfWithType } from "../../types/keyOfWithType";
import { deepCopy } from "../../utils/deepCopy";
import { traversePath } from "../../utils/path";
import { Header } from "../pageStyles";
import { Panel } from "./panel";
import { Preview } from "./preview";
import { Container, Main } from "./styles";
import { useLoadPropOfCustomTypeItem } from "./useLoadPropOfCustomTypeItem";

export const ItemContext = createContext<any>(null);
export const useItem = <T extends any>() => useContext<T>(ItemContext);

export const visualBlockEditorFactory = (itemTypeConfigs: ItemTypeConfigs) => () => {
    const state = useLoadPropOfCustomTypeItem(itemTypeConfigs);

    return match(state)
        .with({ state: "LOADING" }, () => <LoadingVisualEditor />)
        .with({ state: "LOADED" }, ({ itemTypeConfig, item, prop }) => <LoadedVisualEditor itemTypeConfig={itemTypeConfig} item={item} prop={prop} />)
        .with({ state: "ERROR" }, ({ message }) => <ErrorVisualEditor message={message} />)
        .exhaustive();
};

const LoadingVisualEditor = () => {
    return (
        <Container>Loading...</Container>
    );
};

const LoadedVisualEditor = <T extends IItemTypeConfig>(props: { itemTypeConfig: T; item: FullType<T>; prop: KeyOfWithType<FullType<T>, IBlock> }) => {
    const [value, setValue] = useState<IBlock>(deepCopy(props.item[props.prop] as any));

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

    const reset = () => {
        setValue(deepCopy(props.item[props.prop] as any));
    };

    const save = () => {
        console.log({ [props.prop]: value });
    };

    const itemTypePluralName = props.itemTypeConfig.name[1];
    const label = props.itemTypeConfig.getLabel(props.item);

    return (
        <ItemContext.Provider value={props.item}>
            <Container>
                <Header>
                    <Breadcrumb crumbs={[
                        { urlSegment: `content/${itemTypePluralName}`, label: itemTypePluralName },
                        { urlSegment: props.item.id, label: label },
                        { label: props.prop.toString() },
                    ]}/>

                    <SecondaryButton onClick={reset}>{BUTTON_RESET}</SecondaryButton>
                    <PrimaryButton onClick={save}>{BUTTON_SAVE}</PrimaryButton>
                </Header>

                <Main>
                    <Preview root={value} />
                    <Panel root={value} changeData={changeData} addBlock={addBlock} removeBlock={removeBlock} />
                </Main>
            </Container>
        </ItemContext.Provider>
    );
};

const ErrorVisualEditor = (props: { message: string; }) => (
    <Container>
        <ErrorDisplay message={props.message} />
    </Container>
);
