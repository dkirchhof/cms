import { useEffect, useState } from "react";
import { IItem, IItemTypeConfig } from "../../../types/itemTypeConfig";
import { getEntities } from "../../api";
import { IPropEditorProps } from "../../types/propEditor";
import Select, { MultiValue } from "react-select";

interface IOptions<ENTITY extends IItem> {
    itemTypeConfig: IItemTypeConfig<ENTITY, any>;
}

interface ISelectOption { label: string; value: string; }

export const itemSelectorFactory = <ENTITY extends IItem>(options: IOptions<ENTITY>) => (props: IPropEditorProps<string>) => {
    const [items, setItems] = useState<ISelectOption[]>([]);

    const init = async () => {
        const entities = await getEntities(options.itemTypeConfig);

        setItems(
            entities.map(entity => ({ label: options.itemTypeConfig.toString(entity), value: entity.id }))
        );
    };

    const onChange = (option: ISelectOption | null) => {
        if (option) {
            props.onChange(option.value);
        }
    };

    useEffect(() => {
        init();
    }, []);

    const value = items.find(item => item.value === props.value);

    return (
        <Select
            options={items}
            value={value}
            onChange={onChange} />
    );
};


export const itemsSelectorFactory = <ENTITY extends IItem>(options: IOptions<ENTITY>) => (props: IPropEditorProps<string[]>) => {
    const [items, setItems] = useState<ISelectOption[]>([]);

    const init = async () => {
        const entities = await getEntities(options.itemTypeConfig);

        setItems(
            entities.map(entity => ({ label: options.itemTypeConfig.toString(entity), value: entity.id }))
        );
    };

    const onChange = (options: MultiValue<ISelectOption>) => {
        props.onChange(options.map(option => option.value));
    };

    useEffect(() => {
        init();
    }, []);

    const value = items.filter(item => props.value.includes(item.value));

    return (
        <Select
            options={items}
            value={value}
            isMulti
            onChange={onChange} />
    );
};
