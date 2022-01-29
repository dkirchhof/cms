import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Backdrop, Container, EntryGroup } from "./styles";

interface IContextMenuEntry {
    label: string;
    action: () => void;
}

type EntryGroup = (IContextMenuEntry | undefined)[];

export const useContextMenu = (groups: EntryGroup[]) => {
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

    useEffect(() => {
        if (isOpen) {
            const handler = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    setIsOpen(false);
                }
            };

            addEventListener("keydown", handler);

            return () => {
                window.removeEventListener("keydown", handler);
            };
        }
    }, [isOpen]);

    const ContextMenu = () => {
        if (!isOpen) {
            return null;
        }

        return createPortal((
            <Backdrop onClick={onBackdropClick} onContextMenu={onBackdropClick}>
                <Container style={{ left: isOpen.x, top: isOpen.y }}>
                    {groups.map((group, i) => ( 
                        <EntryGroup>
                            {group.map((entry, j) => {
                                if (!entry) {
                                    return null;
                                }

                                return <button key={j} onClick={onEntryClick(entry)}>{entry.label}</button>;
                            })}
                        </EntryGroup>
                    ))}
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
