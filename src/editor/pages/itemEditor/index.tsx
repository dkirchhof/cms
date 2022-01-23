import update from "immer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { match } from "ts-pattern";
import { IItem, IItemTypeConfig, IPropConfig, ItemTypeConfigs, PropValidator } from "../../../types/itemTypeConfig";
import { createItem, updateItem } from "../../api";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { useNotifications } from "../../components/notifications";
import { BUTTON_RESET, BUTTON_SAVE, BUTTON_UPDATE, ITEM_CREATED, ITEM_UPDATED } from "../../messages";
import { Header } from "../pageStyles";
import { Container, Row, Main } from "./styles";
import { useLoadItem } from "./useLoadItem";

interface IEditorField<T, P extends keyof T> extends IPropConfig<T> {
    prop: P;
    initialValue: T[P];
    currentValue: T[P];
    changed: boolean;
    errors: string[];
}

const createEditorFields = <EDITABLE_ITEM extends IItem>(itemTypeConfig: IItemTypeConfig<any, EDITABLE_ITEM>, item: EDITABLE_ITEM | null) => {
    const props = Object.keys(itemTypeConfig.frontend.editor.propConfigs) as (keyof EDITABLE_ITEM)[];

    return props.map(prop => {
        const config = itemTypeConfig.frontend.editor.propConfigs[prop] as IPropConfig<any>;
        const value = item?.[prop] || config.defaultValue;

        const editorField: IEditorField<EDITABLE_ITEM, any> = {
            prop,
            initialValue: value,
            currentValue: value,
            changed: false,
            errors: validate(config.validators, value),
            ...config,
        };

        return editorField;
    });
};

const checkIfHasChanges = (editorFields: IEditorField<any, any>[]) => {
    return editorFields.some(field => field.changed);
};

const checkIfHasErrors = (editorFields: IEditorField<any, any>[]) => {
    return editorFields.some(field => field.errors.length > 0);
};

const validate = <T extends any>(validators: PropValidator<T>[], value: T) => {
    return validators.map(validator => validator(value)).filter(Boolean) as string[];
};

const getValues = <T extends IItem>(editorFields: IEditorField<T, any>[]) => {
    return editorFields.reduce((prev, field) => ({
        ...prev,
        [field.prop]: field.currentValue,
    }), {} as T);
};

export const itemEditorFactory = (itemTypeConfigs: ItemTypeConfigs) => () => {
    const state = useLoadItem(itemTypeConfigs);

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

const Loaded = <EDITABLE_ITEM extends IItem>(props: { itemTypeConfig: IItemTypeConfig<any, EDITABLE_ITEM>; item: EDITABLE_ITEM | null; }) => {
    const navigate = useNavigate();
    const showNotification = useNotifications();

    const [itemId, setItemId] = useState<string | null>(null);
    const [editorFields, setEditorFields] = useState<IEditorField<EDITABLE_ITEM, any>[]>([]);

    useEffect(() => {
        setItemId(props.item?.id || null);
        setEditorFields(createEditorFields(props.itemTypeConfig, props.item));
    }, [props.item]);

    const reset = () => {
        setEditorFields(
            update(fields => {
                fields.forEach(field => {
                    field.currentValue = field.initialValue;
                    field.changed = false;
                    field.errors = [];
                });
            })
        );
    };

    const resetToUpdatedValues = () => {
        setEditorFields(
            update(fields => {
                fields.forEach(field => {
                    field.initialValue = field.currentValue;
                    field.changed = false;
                    field.errors = [];
                });
            })
        );
    };

    const save = async () => {
        try {
            const values = getValues(editorFields);

            if (itemId === null) {
                const id = await createItem(props.itemTypeConfig, values);

                showNotification({ type: "success", message: ITEM_CREATED(props.itemTypeConfig.name[0]) });
                navigate(`/content/${props.itemTypeConfig.name[1]}/${id}`, { replace: true });
            } else {
                await updateItem(props.itemTypeConfig, itemId, values);
                
                showNotification({ type: "success", message: ITEM_UPDATED(props.itemTypeConfig.name[0]) });
                resetToUpdatedValues();
            }
        } catch (e: any) {
            showNotification({ type: "error", message: e.message });
        }
    };

    const changeField = (index: number) => (value: any) => {
        setEditorFields(
            update(fields => {
                const field = fields[index];

                field.currentValue = value;
                field.changed = true;
                field.errors = validate(field.validators, value);
            })
        );
    };

    const itemTypePluralName = props.itemTypeConfig.name[1];
    const hasChanges = checkIfHasChanges(editorFields);
    const hasErrors = checkIfHasErrors(editorFields);

    return (
        <Container>
            <Header>
                <Breadcrumb crumbs={[
                    { urlSegment: "content", label: "content" },
                    { urlSegment: itemTypePluralName, label: itemTypePluralName },
                    { label: itemId || "new" },
                ]} />

                <SecondaryButton onClick={reset} disabled={!hasChanges}>{BUTTON_RESET}</SecondaryButton>
                <PrimaryButton onClick={save} disabled={!hasChanges || hasErrors}>{itemId === null ? BUTTON_SAVE : BUTTON_UPDATE}</PrimaryButton>
            </Header>

            <Main>
                {editorFields.map((field, i) => {
                    const isVisualBlockEditor = field.editor.name === "VisualBlockEditor";

                    return (
                        <Row key={i} fullscreen={isVisualBlockEditor}>
                            <div>{field.prop}</div>
                            <field.editor value={field.currentValue} onChange={changeField(i)} />

                            {field.changed && field.errors.length > 0 && (
                                <ul>
                                    {field.errors.map((error, i) => <li key={i}>{error}</li>)}
                                </ul>
                            )}
                        </Row>
                    );
                })}
            </Main>
        </Container>
    );
};

const Error = (props: { message: string; }) => (
    <Container>
        <ErrorDisplay message={props.message} />
    </Container>
);
