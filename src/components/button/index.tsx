import styled from "styled-components";
import { BORDER, PRIMARY, PRIMARY_FG } from "../../theme/colors";

const Button = styled.button`
    padding: 8px;
    
    border: none;
    border-radius: 4px;

    cursor: pointer;
`;

export const PrimaryButton = styled(Button)`
    color: ${PRIMARY_FG};
    background: ${PRIMARY};
`;

export const SecondaryButton = styled(Button)`
    color: inherit;
    background: ${PRIMARY_FG};
    border: 1px solid ${BORDER};
`;
