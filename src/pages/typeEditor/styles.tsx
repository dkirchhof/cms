import styled from "styled-components";
import { PageContainer } from "../pageStyles";

export const Container = styled(PageContainer)`
    display: flex;
    flex-direction: column;
    gap: 16px;
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
