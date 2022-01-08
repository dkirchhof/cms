import { Link } from "react-router-dom";
import { ItemTypeConfigs } from "../../types/itemType";
import { Container, List } from "./styles";

export const typesListFactory = (itemTypeConfigs: ItemTypeConfigs) => () => {
    return (
        <Container>
            <List>
                {itemTypeConfigs.map(config => <Link key={config.name[1]} to={config.name[1]}>{config.name[1]}</Link>)}
            </List>
        </Container>
    );
};
