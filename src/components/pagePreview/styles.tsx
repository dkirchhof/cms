import styled from "styled-components";
import { BACKGROUND, BORDER } from "../../theme/colors";

export const Container = styled.div`
    overflow-y: auto;

    background: ${BACKGROUND};
    border: 1px solid ${BORDER};
    border-radius: 4px;
`;
