import { useState } from "react";
import { useNavigate } from "react-router";
import { match } from "ts-pattern";
import { GetItemEditingType, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { createItem, updateItem } from "../../api";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { useNotifications } from "../../components/notifications";
import { BUTTON_RESET, BUTTON_SAVE, BUTTON_UPDATE, ITEM_CREATED, ITEM_UPDATED } from "../../messages";
import { PropEditor } from "../../types/propEditor";
import { mapObject } from "../../utils/mapObject";
import { Header } from "../pageStyles";
import { Container, Fields, Label, Main } from "./styles";
import { useLoadItem } from "./useLoadItem";

type Mode = "create" | "update";

export const itemEditorFactory = (itemTypeConfigs: ItemTypeConfigs) => () => {
    const state = useLoadItem(itemTypeConfigs);

    return match(state)
        .with({ state: "LOADING" }, () => <Loading />)
        .with({ state: "LOADED" }, ({ itemTypeConfig, item, mode }) => <Loaded itemTypeConfig={itemTypeConfig} item={item} mode={mode} />)
        .with({ state: "ERROR" }, ({ message }) => <Error message={message} />)
        .exhaustive();
};

const Loading = () => {
    return (
        <Container>Loading...</Container>
    );
};

const Loaded = <T extends IItemTypeConfig>(props: { itemTypeConfig: T; item: GetItemEditingType<T>; mode: Mode }) => {
    const navigate = useNavigate();
    const showNotification = useNotifications();

    const [item, setItem] = useState(props.item);
    const [editedFields, setEditedFields] = useState<Partial<GetItemEditingType<T>>>({});
    
    const mergedItem = {
        ...item,
        ...editedFields,
    };

    const reset = () => {
        setEditedFields({});
    };

    const save = async () => {
        try {
            if (props.mode === "create") {
                const createdItem = await createItem(props.itemTypeConfig, mergedItem);

                showNotification({ type: "success", message: ITEM_CREATED(props.itemTypeConfig.name[0]) });
                navigate(`/content/${props.itemTypeConfig.name[1]}/${createdItem.id}`, { replace: true });
            } else {
                const updatedItem = await updateItem(props.itemTypeConfig, item.id, editedFields);

                setItem(updatedItem);
                reset();

                showNotification({ type: "success", message: ITEM_UPDATED(props.itemTypeConfig.name[0]) });
            }
        } catch (e: any) {
            showNotification({ type: "error", message: e.message });
        }
    };

    const changeField = <P extends keyof GetItemEditingType<T>>(prop: P) => (value: GetItemEditingType<T>[P]) => {
        setEditedFields({
            ...editedFields,
            [prop]: value,
        });
    };

    const itemTypePluralName = props.itemTypeConfig.name[1];
    const label = props.itemTypeConfig.getLabel(mergedItem);
    const inputs = props.itemTypeConfig.getEditorInputs();
    const hasChanges = Object.keys(editedFields).length;

    return (
        <Container>
            <Header>
                <Breadcrumb crumbs={[
                    { urlSegment: "content", label: "content" },
                    { urlSegment: itemTypePluralName, label: itemTypePluralName },
                    { label: label },
                ]} />

                <SecondaryButton onClick={reset} disabled={!hasChanges}>{BUTTON_RESET}</SecondaryButton>
                <PrimaryButton onClick={save} disabled={!hasChanges}>{props.mode === "create" ? BUTTON_SAVE : BUTTON_UPDATE}</PrimaryButton>
            </Header>

            <Main>
                <Fields>
                    {mapObject<keyof GetItemEditingType<T>, PropEditor<any>>(inputs, ([prop, Input]) => {
                        if (!Input) {
                            return null;
                        }

                        const value = (editedFields[prop] !== undefined) ? editedFields[prop] : item[prop];
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
