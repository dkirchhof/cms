import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const Container = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 16px;

    height: 100%;
    min-height: 0;
    padding: 32px;

    box-sizing: border-box;

    animation: ${fadeIn} 1s both;
`;

export const Header = styled.header`
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-gap: 16px;
    align-items: center;
`;

export const Main = styled.main`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;

    overflow: hidden;
`;
