import { useEffect, useState } from "react";
import { IPropEditorProps } from "../../types/propEditor";
import Select, { MultiValue } from "react-select";
import { IItemTypeForList } from "../../../itemTypeBuilder";
import { createApi } from "../../api";

interface IOptions<LIST_PROPS extends string> {
    itemType: IItemTypeForList<LIST_PROPS>;
}

interface ISelectOption { label: string; value: string; }

export const itemSelectorFactory = <LIST_PROPS extends string>(options: IOptions<LIST_PROPS>) => (props: IPropEditorProps<string>) => {
    const [items, setItems] = useState<ISelectOption[]>([]);

    const init = async () => {
        const { items } = await createApi(options.itemType).getList();

        setItems(
            items.map(item => ({ label: options.itemType.toString(item), value: item.id }))
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
        const { items } = await createApi(options.itemType).getList();

        setItems(
            items.map(item => ({ label: options.itemType.toString(item), value: item.id }))
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
