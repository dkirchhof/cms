import { useEffect, useState } from "react";
import { IItem, IItemTypeConfig } from "../../../types/itemTypeConfig";
import { getEntities } from "../../api";
import { IPropEditorProps } from "../../types/propEditor";
import { Select } from "./styles";

interface IOptions<ENTITY extends IItem> {
    itemTypeConfig: IItemTypeConfig<ENTITY, any>;
}

const itemToString = <ENTITY extends IItem>(item: ENTITY, itemTypeConfig: IItemTypeConfig<ENTITY>) => {
    return itemTypeConfig.frontend.listProps.map(prop => item[prop]).join(", ");
};

export const itemSelectorFactory = <ENTITY extends IItem>(options: IOptions<ENTITY>) => (props: IPropEditorProps<string>) => {
    const [items, setItems] = useState<ENTITY[]>([]);
    
    const init = async () => {
        const result = await getEntities(options.itemTypeConfig);

        setItems(result);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <Select value={props.value} onChange={e => props.onChange(e.currentTarget.value)}>
            {items.map(item => <option key={item.id} value={item.id}>{itemToString(item, options.itemTypeConfig)}</option>)}
        </Select>
    );
};

export const itemsSelectorFactory = <ENTITY extends IItem>(options: IOptions<ENTITY>) => (props: IPropEditorProps<string[]>) => {
    const [items, setItems] = useState<ENTITY[]>([]);
    
    const init = async () => {
        const result = await getEntities(options.itemTypeConfig);

        setItems(result);
    };

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChange([...e.currentTarget.selectedOptions].map(option => option.value));
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <Select value={props.value} onChange={onChange} multiple>
            {items.map(item => <option key={item.id} value={item.id}>{itemToString(item, options.itemTypeConfig)}</option>)}
        </Select>
    );
};
