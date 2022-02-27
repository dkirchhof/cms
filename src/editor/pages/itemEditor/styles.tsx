import styled from "styled-components";
import { DANGEROUS, GRAY_128 } from "../../theme/colors";
import { PageContainer } from "../pageStyles";

export const Container = styled(PageContainer)`
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: hidden;
`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 32px;
    overflow-y: auto;
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    > select, > input {
        width: 100%;
    }
`;

export const PropName = styled.div`
    font-weight: bold;
    text-transform: capitalize;
`;

export const Lang = styled.div`
    color: ${GRAY_128};
    font-size: 12px;
`;

export const Errors = styled.ul`
    margin: 8px 0px 0px 0px;
    color: ${DANGEROUS};
`;
