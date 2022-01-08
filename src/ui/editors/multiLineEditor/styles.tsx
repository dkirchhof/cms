import styled from "styled-components";
import { BORDER } from "../../theme/colors";

export const Textarea = styled.textarea`
    height: 100px;
    padding: 8px;

    border: 1px solid ${BORDER};
    border-radius: 4px;

    font-family: inherit;

    resize: none;
`;
