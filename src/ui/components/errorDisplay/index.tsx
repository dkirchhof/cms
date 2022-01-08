import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../button";

interface IProps {
    message: string;
}

export const ErrorDisplay = (props: IProps) => {
    const navigate = useNavigate();

    return (
        <div>
            {props.message}
            <PrimaryButton onClick={() => navigate(-1)}>go back</PrimaryButton>
        </div>
    );
};
