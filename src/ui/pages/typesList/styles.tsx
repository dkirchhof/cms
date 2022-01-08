import styled from "styled-components";
import { BACKGROUND, BORDER } from "../../theme/colors";
import { PageContainer } from "../pageStyles";

export const Container = styled(PageContainer)`
    padding: 32px;

    overflow: hidden;
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    height: 100%;

    overflow-y: auto;

    > a {
        padding: 16px;

        background: ${BACKGROUND};
        color: inherit;
        border: 1px solid ${BORDER};
        border-radius: 4px;

        cursor: pointer;

        text-decoration: none;
    }
`;
