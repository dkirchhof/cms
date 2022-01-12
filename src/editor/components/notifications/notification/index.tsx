import { useEffect, useRef, useState } from "react";
import { INotification } from "../../../types/notification";
import { GUTTER_SIZE, InnerContainer, OuterContainer } from "./styles";

interface IProps {
    notification: INotification;

    close: () => void;
}

export const Notification = (props: IProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [height, setHeight] = useState<string | number>("auto");
    const [opacity, setOpacity] = useState(1);

    const dismiss = () => {
        setHeight(0);
        setOpacity(0);
    };

    useEffect(() => {
        if (props.notification.type !== "error") {
            setTimeout(dismiss, 3000);
        }

        setHeight(containerRef.current!.offsetHeight + GUTTER_SIZE);
    }, []);

    return (
        <OuterContainer ref={containerRef} style={{ height, opacity }} onClick={dismiss} onTransitionEnd={props.close}>
            <InnerContainer type={props.notification.type}>{props.notification.message}</InnerContainer>
        </OuterContainer>
    )
};
