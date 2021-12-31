import update from "immer";
import { createContext, useContext, useState } from "react";
import { match } from "ts-pattern";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { BUTTON_RESET, BUTTON_SAVE } from "../../messages";
import { IBlock } from "../../types/block";
import { ICustomType, ICustomTypeConfig } from "../../types/customType";
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

export const VisualBlockEditor = <T extends any>() => {
    const state = useLoadPropOfCustomTypeItem<T>();

    return match(state)
        .with({ state: "LOADING" }, () => <LoadingVisualEditor />)
        .with({ state: "LOADED" }, ({ typeName, typeConfig, item, prop }) => <LoadedVisualEditor typeName={typeName} typeConfig={typeConfig} item={item} prop={prop} />)
        .with({ state: "ERROR" }, ({ message }) => <ErrorVisualEditor message={message} />)
        .exhaustive();
};

const LoadingVisualEditor = () => {
    return (
        <Container>Loading...</Container>
    );
};

const LoadedVisualEditor = <T extends any>(props: { typeName: string; typeConfig: ICustomTypeConfig<T>; item: ICustomType<T>; prop: KeyOfWithType<T, IBlock> }) => {
    const [value, setValue] = useState<IBlock>(deepCopy(props.item.data[props.prop] as any));

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
        setValue(deepCopy(props.item.data[props.prop] as any));
    };

    const save = () => {
        console.log({ [props.prop]: value });
    };

    return (
        <ItemContext.Provider value={props.item}>
            <Container>
                <Header>
                    <Breadcrumb crumbs={[
                        { urlSegment: `content/${props.typeName}`, label: props.typeName },
                        { urlSegment: props.item.id, label: props.typeConfig.getLabel(props.item.data) },
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
