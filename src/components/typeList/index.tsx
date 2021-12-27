import { Link, Navigate, useParams } from "react-router-dom";
import { MY_PAGES, MY_TYPES } from "../../myTypes";
import { ICustomTypeConfig } from "../../types/customType";

export const TypeList = <T extends { id: string; }>() => {
    const { typePluralName } = useParams();

    const typeConfig: ICustomTypeConfig<T> | undefined = MY_TYPES.find(type => type.pluralName === typePluralName);

    if (!typeConfig) {
        return <Navigate to="/404" />;
    }

    // todo: fetch items for this type
    const items = MY_PAGES as any as T[];

    return (
        <div>
            <div>{typeConfig.pluralName}</div>

            <div>{items.map(item => {
                const link = `/${typeConfig.pluralName}/${item.id}`;

                return <Link key={item.id} to={link}>{typeConfig.getLabel(item)}</Link>
            })}</div>
        </div>
    );
};
