import update from "immer";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { match } from "ts-pattern";
import { IItemTypeConfigForEditor } from "../../../itemTypeBuilder";
import { EditorFields, IEditorField, IEditorItem, PropValidator } from "../../../itemTypeBuilder/editorField";
import { ItemContext } from "../../../shared/contexts/itemContext";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { useNotifications } from "../../components/notifications";
import { BUTTON_RESET, BUTTON_SAVE, BUTTON_UPDATE, ITEM_CREATED, ITEM_UPDATED } from "../../messages";
import { Header } from "../pageStyles";
import { Container, Main, Group, PropName, Lang, Errors } from "./styles";
import { useLoadItem } from "./useLoadItem";

interface INonLocalizedFieldGroup extends IEditorField<any, false> {
    prop: string;
    fields: [INonLocalizedField];
}

interface ILocalizedFieldGroup extends IEditorField<any, true> {
    prop: string;
    fields: ILocalizedField[];
}

interface INonLocalizedField<T = any> extends IEditorField<T, false> {
    locale?: undefined;
    initialValue: T;
    currentValue: T;
    changed: boolean;
    errors: string[];
}

interface ILocalizedField<T = any> extends IEditorField<T, true> {
    locale: string;
    initialValue: T;
    currentValue: T;
    changed: boolean;
    errors: string[];
}

type FieldGroup = INonLocalizedFieldGroup | ILocalizedFieldGroup;
type EditorFieldGroups = FieldGroup[];

const createLocalizedFieldGroup = (prop: string, propConfig: IEditorField<any, true>, item: IEditorItem | undefined, locales: readonly string[]) => {
    const group: ILocalizedFieldGroup = {
        prop,
        localize: true,
        defaultValue: propConfig.defaultValue,
        editor: propConfig.editor,
        validators: propConfig.validators,
        fields: locales.map(locale => {
            const value = (item?.[prop] as any)[locale] || propConfig.defaultValue;

            return createLocalizedField(propConfig, value, locale);
        }),
    };

    return group;
};

const createNonLocalizedFieldGroup = (prop: string, propConfig: IEditorField<any, false>, item: IEditorItem | undefined) => {
    const value = item?.[prop] || propConfig.defaultValue;

    const group: INonLocalizedFieldGroup = {
        prop,
        localize: false,
        defaultValue: propConfig.defaultValue,
        editor: propConfig.editor,
        validators: propConfig.validators,
        fields: [
            createNonLocalizedField(propConfig, value),
        ],
    };

    return group;
};

const createLocalizedField = (propConfig: IEditorField<any, true>, value: any, locale: string) => {
    const editorField: ILocalizedField = {
        ...propConfig,
        locale,
        initialValue: value,
        currentValue: value,
        changed: false,
        errors: validate(propConfig.validators, value),
    };

    return editorField;
};

const createNonLocalizedField = (propConfig: IEditorField<any, false>, value: any) => {
    const editorField: INonLocalizedField = {
        ...propConfig,
        initialValue: value,
        currentValue: value,
        changed: false,
        errors: validate(propConfig.validators, value),
    };

    return editorField;
};

const createEditorFieldGroups = <EDITOR extends EditorFields>(itemTypeConfig: IItemTypeConfigForEditor<EDITOR>, item: IEditorItem<EDITOR> | undefined, locales: readonly string[]) => {
    return Object.entries(itemTypeConfig.editorType.fields).map(entry => {
        const prop = entry[0];
        const propConfig = entry[1] as IEditorField<any, any>;

        if (propConfig.localize) {
            return createLocalizedFieldGroup(prop, propConfig, item, locales);
        }

        return createNonLocalizedFieldGroup(prop, propConfig, item);
    });
};

const checkIfGroupHasChanges = (editorFieldGroup: FieldGroup) => {
    return editorFieldGroup.fields.some(field => field.changed);
};

const checkIfGroupsHaveChanges = (editorFieldGroups: EditorFieldGroups) => {
    return editorFieldGroups.some(checkIfGroupHasChanges);
};

const checkIfGroupHasErrors = (editorFieldGroup: FieldGroup) => {
    return editorFieldGroup.fields.some(field => field.errors.length > 0);
};

const checkIfGroupsHaveErrors = (editorFieldGroups: EditorFieldGroups) => {
    return editorFieldGroups.some(checkIfGroupHasErrors);
};

const validate = <T extends any>(validators: PropValidator<T>[], value: T) => {
    return validators.map(validator => validator(value)).filter(Boolean) as string[];
};

const getValues = <T extends IEditorItem>(editorFieldGroups: EditorFieldGroups) => {
    return editorFieldGroups.reduce((result, group) => {
        if (!checkIfGroupHasChanges(group)) {
            return result;
        }

        if (group.localize) {
            return {
                ...result,
                [group.prop]: group.fields.reduce((fields, field) => {
                    if (!field.changed) {
                        return fields;
                    }

                    return {
                        ...fields,
                        [field.locale]: field.currentValue,
                    };
                }, {}),
            };
        }
        
        if (group.fields[0].changed) {
            return {
                ...result,
                [group.prop]: group.fields[0].currentValue,
            };
        }

        return result;
    }, {} as T);
};

export const itemEditorFactory = (itemTypeConfigs: IItemTypeConfigForEditor<any>[], locales: readonly string[]) => () => {
    const state = useLoadItem(itemTypeConfigs);

    return match(state)
        .with({ state: "LOADING" }, () => <Loading />)
        .with({ state: "LOADED" }, ({ itemTypeConfig, item }) => <Loaded itemTypeConfig={itemTypeConfig} item={item} locales={locales} />)
        .with({ state: "ERROR" }, ({ message }) => <Error message={message} />)
        .exhaustive();
};

const Loading = () => {
    return (
        <Container>Loading...</Container>
    );
};

const Loaded = <EDITOR extends EditorFields>(props: { itemTypeConfig: IItemTypeConfigForEditor<EDITOR>; item?: IEditorItem<EDITOR>; locales: readonly string[]; }) => {
    const navigate = useNavigate();
    const showNotification = useNotifications();

    const [itemId, setItemId] = useState<string | null>(null);
    const [editorFieldGroups, setEditorFieldGroups] = useState<EditorFieldGroups>([]);

    useEffect(() => {
        setItemId(props.item?.id || null);
        setEditorFieldGroups(createEditorFieldGroups(props.itemTypeConfig, props.item, props.locales));
    }, [props.item]);

    const reset = () => {
        setEditorFieldGroups(
            update((groups: EditorFieldGroups) => {
                groups.forEach(group => {
                    group.fields.forEach(field => {
                        field.currentValue = field.initialValue;
                        field.changed = false;
                        field.errors = [];
                    });
                });
            })
        );
    };

    const setCurrentToInitialValues = () => {
        setEditorFieldGroups(
            update((groups: EditorFieldGroups) => {
                groups.forEach(group => {
                    group.fields.forEach(field => {
                        field.initialValue = field.currentValue;
                        field.changed = false;
                        field.errors = [];
                    });
                });
            })
        );
    };

    const save = async () => {
        try {
            const values = getValues(editorFieldGroups);

            if (itemId === null) {
                const id = await props.itemTypeConfig.api.createItem(values as any);

                showNotification({ type: "success", message: ITEM_CREATED(props.itemTypeConfig.name[0]) });
                navigate(`/content/${props.itemTypeConfig.name[1]}/${id}`, { replace: true });
            } else {
                await props.itemTypeConfig.api.updateItem(itemId, values as any);

                showNotification({ type: "success", message: ITEM_UPDATED(props.itemTypeConfig.name[0]) });
                setCurrentToInitialValues();
            }
        } catch (e: any) {
            showNotification({ type: "error", message: e.message });
        }
    };

    const changeNonLocalizedField = (prop: string, value: any) => {
        setEditorFieldGroups(
            update((groups: EditorFieldGroups) => {
                const group = groups.find(group => group.prop === prop)! as INonLocalizedFieldGroup;
                const field = group.fields[0];

                field.currentValue = value;
                field.changed = true;
                field.errors = validate(group.validators, value);
            })
        );
    };

    const changeLocalizedField = (prop: string, locale: string, value: any) => {
        setEditorFieldGroups(
            update((groups: EditorFieldGroups) => {
                const group = groups.find(group => group.prop === prop)! as ILocalizedFieldGroup;
                const field = group.fields.find(field => field.locale === locale)!;

                field.currentValue = value;
                field.changed = true;
                field.errors = validate(group.validators, value);
            })
        );
    };

    const changeField = (prop: string, locale?: string) => (value: any) => {
        if (locale) {
            changeLocalizedField(prop, locale, value);
        } else {
            changeNonLocalizedField(prop, value);
        }
    };

    const itemTypePluralName = props.itemTypeConfig.name[1];
    const hasChanges = checkIfGroupsHaveChanges(editorFieldGroups);
    const hasErrors = checkIfGroupsHaveErrors(editorFieldGroups);

    return (
        <ItemContext.Provider value={{ type: "EDITOR_FIELDS", editorFields: {} }}>
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
                    {editorFieldGroups.map(group => (
                        <Group key={group.prop}>
                            <PropName>{group.prop}</PropName>

                            {group.fields.map((field, i) => (
                                <Fragment key={i}>
                                    {field.locale && <Lang>{field.locale}</Lang>}

                                    <group.editor value={field.currentValue} onChange={changeField(group.prop, field.locale)} />

                                    {field.changed && field.errors.length > 0 && (
                                        <Errors>
                                            {field.errors.map((error, i) => <li key={i}>{error}</li>)}
                                        </Errors>
                                    )}
                                </Fragment>
                            ))}
                        </Group>
                    ))}
                </Main>
            </Container>
        </ItemContext.Provider>
    );
};

const Error = (props: { message: string; }) => (
    <Container>
        <ErrorDisplay message={props.message} />
    </Container>
);
