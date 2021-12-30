import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr;

    height: 100%;
    min-height: 0;
    padding: 32px;

    box-sizing: border-box;
`;

export const Header = styled.header`
`;

export const Main = styled.main`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;

    overflow: hidden;
`;
