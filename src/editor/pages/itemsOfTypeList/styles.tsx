import styled from "styled-components";
import { BORDER, GRAY_245 } from "../../theme/colors";
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

export const Table = styled.table`
    width: 100%;
    table-layout: fixed;

    border: 1px solid ${BORDER};
    border-radius: 4px;
    border-spacing: 0;

    overflow: hidden;

    > thead > tr > th {
        padding: 16px;

        background: ${GRAY_245};

        text-align: left;
    }

    > tbody > tr {
        cursor: pointer;

        :hover {
            background: ${GRAY_245};
        }

        > td {
            padding: 16px;

            border-top: 1px solid ${BORDER};
        }
    }
`;
