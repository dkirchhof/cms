import { Link } from "react-router-dom";
import { IItemTypeConfig } from "../../../itemTypeBuilder";
import { Container, List } from "./styles";

export const typesListFactory = (itemTypeConfigs: IItemTypeConfig[]) => () => {
    return (
        <Container>
            <List>
                {itemTypeConfigs.map(config => <Link key={config.name[1]} to={config.name[1]}>{config.name[1]}</Link>)}
            </List>
        </Container>
    );
};
