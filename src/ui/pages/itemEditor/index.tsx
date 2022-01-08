import { useState } from "react";
import { match } from "ts-pattern";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { BUTTON_RESET, BUTTON_SAVE } from "../../messages";
import { IItem } from "../../types/item";
import { IItemTypeConfig, ItemTypeConfigs } from "../../types/itemType";
import { PropEditor } from "../../types/propEditor";
import { mapObject } from "../../utils/mapObject";
import { Header } from "../pageStyles";
import { Container, Fields, Label, Main } from "./styles";
import { useLoadItem } from "./useLoadItem";

export const itemEditorFactory = (itemTypeConfigs: ItemTypeConfigs) => <T extends IItem>() => {
    const state = useLoadItem<T>(itemTypeConfigs);

    return match(state)
        .with({ state: "LOADING" }, () => <Loading />)
        .with({ state: "LOADED" }, ({ itemTypeConfig, item }) => <Loaded itemTypeConfig={itemTypeConfig} item={item} />)
        .with({ state: "ERROR" }, ({ message }) => <Error message={message} />)
        .exhaustive();
};

const Loading = () => {
    return (
        <Container>Loading...</Container>
    );
};

const Loaded = <T extends IItem>(props: { itemTypeConfig: IItemTypeConfig<T>; item: T; }) => {
    const [editedFields, setEditedFields] = useState<Partial<T>>({});

    const reset = () => {
        setEditedFields({});
    };

    const save = () => {
        console.log(editedFields);
    };

    const changeField = <P extends keyof T>(prop: P) => (value: T[P]) => {
        setEditedFields({
            ...editedFields,
            [prop]: value,
        });
    };

    const itemTypePluralName = props.itemTypeConfig.name[1];
    const label = props.itemTypeConfig.getLabel(props.item);
    const inputs = props.itemTypeConfig.getEditorInputs();

    return (
        <Container>
            <Header>
                <Breadcrumb crumbs={[
                    { urlSegment: `content/${itemTypePluralName}`, label: itemTypePluralName },
                    { label: label  },
                ]}/>

                <SecondaryButton onClick={reset}>{BUTTON_RESET}</SecondaryButton>
                <PrimaryButton onClick={save}>{BUTTON_SAVE}</PrimaryButton>
            </Header>
            
            <Main>
                <Fields>
                    {mapObject<keyof T, PropEditor<any>>(inputs, ([prop, Input]) => {
                        if (!Input) {
                            return null;
                        }

                        const value = (editedFields[prop] !== undefined) ? editedFields[prop] : props.item[prop];
                        const onChange = changeField(prop);

                        return (
                            <Label key={prop.toString()}>
                                {prop}
                                <Input prop={prop.toString()} value={value} onChange={onChange} />
                            </Label>
                        );
                    })}
                </Fields>
            </Main>
        </Container>
    );
};

const Error = (props: { message: string; }) => (
    <Container>
        <ErrorDisplay message={props.message} />
    </Container>
);
