import { useEffect, useRef, useState } from "react";

export const useThrottledValue = <T>(initialValue: T, onChange: (value: T) => void, throttleTime: number) => {
    const timeout = useRef<NodeJS.Timeout>();

    const [value, setValue] = useState(initialValue);
    
    useEffect(() => {
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            onChange(value);
            timeout.current = undefined;
        }, throttleTime);
    }, [value]);

    return [value, setValue] as const;
};
