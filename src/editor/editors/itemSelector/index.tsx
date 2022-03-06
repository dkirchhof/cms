import { useEffect, useState } from "react";
import { getList } from "../../api";
import { IPropEditorProps } from "../../types/propEditor";
import Select, { MultiValue } from "react-select";
import { IItemTypeConfigForList } from "../../../itemTypeBuilder";

interface IOptions<LIST_PROPS extends string> {
    itemTypeConfig: IItemTypeConfigForList<LIST_PROPS>;
}

interface ISelectOption { label: string; value: string; }

export const itemSelectorFactory = <LIST_PROPS extends string>(options: IOptions<LIST_PROPS>) => (props: IPropEditorProps<string>) => {
    const [items, setItems] = useState<ISelectOption[]>([]);

    const init = async () => {
        const entities = await getList(options.itemTypeConfig);

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


export const itemsSelectorFactory = <LIST_PROPS extends string>(options: IOptions<LIST_PROPS>) => (props: IPropEditorProps<string[]>) => {
    const [items, setItems] = useState<ISelectOption[]>([]);

    const init = async () => {
        const entities = await getList(options.itemTypeConfig);

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
