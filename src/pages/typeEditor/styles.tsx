import styled from "styled-components";
import { PageContainer } from "../pageStyles";

export const Container = styled(PageContainer)`
    display: grid;
    grid-template-rows: auto 1fr;

    overflow: hidden;
`;

export const Main = styled.main`
    padding: 32px;

    overflow: hidden;
`;

export const Fields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    height: 100%;

    overflow-y: auto;
`;

export const Label = styled.label`
    display: block;

    font-weight: bold;

    > * {
        display: block;

        margin-top: 8px;
        box-sizing: border-box;
    }

    > input, textarea {
        width: 100%;
    }
`;
