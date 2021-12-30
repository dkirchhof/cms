import styled from "styled-components";
import { PageContainer } from "../pageStyles";

export const Container = styled(PageContainer)`
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 16px;

    height: 100%;
    min-height: 0;

    box-sizing: border-box;
`;

export const Main = styled.main`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;

    overflow: hidden;
`;
