import { MouseEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Backdrop, Container, EntryGroup } from "./styles";

interface IContextMenuEntry {
    label: string;
    action: () => void;
}

type EntryGroup = (IContextMenuEntry | undefined)[];

export const useContextMenu = (groups: EntryGroup[]) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<{ x: number; y: number; }>({ x: 0, y: 0 });

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
            const keydownHandler = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    setIsOpen(false);
                }
            };

            const blurHandler = () => {
                setIsOpen(false);
            };

            addEventListener("keydown", keydownHandler);
            addEventListener("blur", blurHandler);

            // fix position

            const { width, height } = containerRef.current!.getBoundingClientRect();
            
            const x = (position.x + width > window.innerWidth) ? position.x - width : position.x;
            const y = (position.y + height > window.innerHeight) ? position.y - height : position.y;

            setPosition({ x, y });

            return () => {
                window.removeEventListener("keydown", keydownHandler);
                window.removeEventListener("blur", blurHandler);
            };
        }
    }, [isOpen]);

    const ContextMenu = () => {
        if (!isOpen) {
            return null;
        }

        return createPortal((
            <Backdrop onClick={onBackdropClick} onContextMenu={onBackdropClick}>
                <Container ref={containerRef} style={{ left: position.x, top: position.y }}>
                    {groups.map((group, i) => ( 
                        <EntryGroup key={i}>
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

        setPosition({ x: e.clientX, y: e.clientY });
        setIsOpen(true);
    };

    return { ContextMenu, openContextMenu };
};
