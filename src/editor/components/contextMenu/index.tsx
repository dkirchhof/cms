import { MouseEvent, useState } from "react";
import { createPortal } from "react-dom";
import { Backdrop, Container } from "./styles";

interface IContextMenuEntry {
    label: string;
    action: () => void;
}

export const useContextMenu = (entries: IContextMenuEntry[]) => {
    const [isOpen, setIsOpen] = useState<{ x: number; y: number; } | false>(false);

    const onBackdropClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
    };

    const onEntryClick = (entry: IContextMenuEntry) => () => {
        setIsOpen(false);
        entry.action();
    };

    const ContextMenu = () => {
        if (!isOpen) {
            return null;
        }

        return createPortal((
            <Backdrop onClick={onBackdropClick} onContextMenu={onBackdropClick}>
                <Container style={{ left: isOpen.x, top: isOpen.y }}>
                    {entries.map((entry, i) => <button key={i} onClick={onEntryClick(entry)}>{entry.label}</button>)}
                </Container>
            </Backdrop>
        ), document.body);
    };

    const openContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen({ x: e.clientX, y: e.clientY });
    };

    return { ContextMenu, openContextMenu };
};
