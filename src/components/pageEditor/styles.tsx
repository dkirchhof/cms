import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr;

    height: 100%;
`;

export const Main = styled.main`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;

    padding: 16px;

    overflow: hidden;
`;
