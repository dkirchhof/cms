import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const PageContainer = styled.div`
    animation: ${fadeIn} 1s both;
`;

export const Header = styled.header`
    display: grid;
    grid-template-columns: 1fr 128px 128px;
    grid-gap: 16px;
    align-items: center;

    padding: 16px 32px;

    background: white;
    box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
`;
