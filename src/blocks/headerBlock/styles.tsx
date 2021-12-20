import styled from "styled-components";

export const HeaderContainer = styled.div`
    position: relative;
    height: 300px;

    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    > div {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        color: white;
        background: linear-gradient(0deg, #242424, transparent);

        text-align: center;
    }
`;
