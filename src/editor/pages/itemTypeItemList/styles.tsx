import styled from "styled-components";
import { BACKGROUND, BORDER, GRAY_245 } from "../../theme/colors";
import { PageContainer } from "../pageStyles";

export const Container = styled(PageContainer)`
    display: grid;
    grid-template-rows: auto 1fr;

    overflow: hidden;
`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;

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

    > thead {
        background: ${GRAY_245};

        > tr > th {
            padding: 16px;

            text-align: left;
            text-transform: capitalize;
        }
    }

    > tbody {
        background: ${BACKGROUND};

        > tr {
            cursor: pointer;

            :hover {
                background: ${GRAY_245};
            }

            > td {
                padding: 16px;

                border-top: 1px solid ${BORDER};
            }
        }
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;

    align-self: flex-end;
    margin-top: 16px;
    padding: 4px;

    background: ${BACKGROUND};
    border: 1px solid ${BORDER};
    border-radius: 4px;

    > button {
        padding: 0px;

        background: none;
        border: none;
        border-radius: 4px;

        cursor: pointer;

        :hover {
            background: ${GRAY_245};
        }

        &[disabled] {
            color: ${BORDER};

            pointer-events: none;
        }

        > svg {
            display: block;
            width: 32px;
            height: 32px;

            > path {
                fill: currentColor;
            }
        }
    }
`;
