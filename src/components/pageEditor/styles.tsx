import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr;

    height: 100%;
`;

export const Main = styled.main`
    display: grid;
    grid-template-columns: 1fr 256px 384px;
    gap: 16px;

    /* scrollable container fix */
    min-height: 0;

    padding: 16px;
`;
