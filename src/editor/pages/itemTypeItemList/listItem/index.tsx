import { IListItem } from "../../../../itemTypeBuilder/listField";
import { useContextMenu } from "../../../components/contextMenu";
import { CTX_MENU_DELETE, CTX_MENU_EDIT } from "../../../messages";

interface IProps<LIST_PROPS extends string> {
    listProps: readonly LIST_PROPS[];
    item: IListItem<LIST_PROPS>;

    editItem: (itemId: string) => void;
    delItem: (itemId: string) => void;
}

export const ListItem = <LIST_PROPS extends string>(props: IProps<LIST_PROPS>) => {
    const { ContextMenu, openContextMenu } = useContextMenu([
        [
            { label: CTX_MENU_EDIT, action: () => props.editItem(props.item.id) },
            { label: CTX_MENU_DELETE, action: () => props.delItem(props.item.id) },
        ],
    ]);

    return (
        <tr onClick={() => props.editItem(props.item.id)} onContextMenu={openContextMenu}>
            {props.listProps.map(prop => <td key={prop.toString()}>{props.item[prop]}</td>)}

            <ContextMenu />
        </tr>
    );
};
