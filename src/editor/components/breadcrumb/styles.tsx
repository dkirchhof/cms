import styled from "styled-components";
import { PRIMARY } from "../../theme/colors";

export const Nav = styled.nav`
    text-transform: uppercase;

    > a {
        color: inherit;
        text-decoration: none;

        ::after {
            content: "/";
            margin: 0px 10px;
        }
    }

    > span {
        color: ${PRIMARY};
    }
`;
