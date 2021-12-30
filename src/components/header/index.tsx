import { NavLink } from "react-router-dom";
import { HOME } from "../../messages";
import { MY_TYPES } from "../../myTypes";
import { Container, Nav } from "./styles";

export const Header = () => (
    <Container>
        <Nav>
            <NavLink to="/">{HOME}</NavLink>

            {MY_TYPES.map(type => <NavLink key={type.pluralName} to={`/${type.pluralName}`}>{type.pluralName}</NavLink>)}
        </Nav>
    </Container>
);
