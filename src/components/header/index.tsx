import { NavLink } from "react-router-dom";
import { CONTENT, HOME } from "../../messages";
import { Container, Nav } from "./styles";

export const Header = () => (
    <Container>
        <Nav>
            <NavLink to="/">{HOME}</NavLink>
            <NavLink to="/content">{CONTENT}</NavLink>
        </Nav>
    </Container>
);
