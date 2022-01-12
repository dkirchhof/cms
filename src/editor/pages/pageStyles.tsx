import styled, { keyframes } from "styled-components";
import { BACKGROUND } from "../theme/colors";

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const PageContainer = styled.div`
    animation: ${fadeIn} 1s both;
`;

export const Header = styled.header`
    display: flex;
    gap: 16px;
    align-items: center;

    padding: 16px 32px;

    background: ${BACKGROUND};
    box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);

    > nav {
        flex: 1;
    }

    > button {
        width: 128px;
    }
`;
