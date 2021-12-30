import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const PageContainer = styled.div`
    padding: 32px;

    animation: ${fadeIn} 1s both;
`;

export const Header = styled.header`
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-gap: 16px;
    align-items: center;
`;
