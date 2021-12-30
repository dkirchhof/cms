import styled from "styled-components";
import { PageContainer } from "../pageStyles";

export const Container = styled(PageContainer)`
    display: grid;
    grid-template-rows: auto 1fr;

    height: 100%;
    min-height: 0;

    box-sizing: border-box;
`;

export const Main = styled.main`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;

    padding: 32px;

    overflow: hidden;
`;
