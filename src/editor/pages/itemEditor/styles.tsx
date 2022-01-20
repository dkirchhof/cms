import styled from "styled-components";
import { DANGEROUS } from "../../theme/colors";
import { PageContainer } from "../pageStyles";

export const Container = styled(PageContainer)`
    display: grid;
    grid-template-rows: auto 1fr;

    overflow: hidden;
`;

export const Main = styled.main`
    padding: 0px 32px 32px 32px;

    overflow-y: auto;
    scroll-snap-type: y;
`;

export const Row = styled.div<{ fullscreen: boolean; }>`
    height: ${props => props.fullscreen ? "100%" : "auto"};
    padding-top: 32px;

    display: flex;
    flex-direction: column;

    scroll-snap-align: start;

    > div:nth-child(1) {
        margin-bottom: 8px;

        font-weight: bold;
    }

    > input, textarea {
        width: 100%;
    }

    > ul {
        color: ${DANGEROUS};
    }
`;
