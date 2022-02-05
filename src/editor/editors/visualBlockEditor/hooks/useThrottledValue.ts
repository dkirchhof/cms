import { useEffect, useRef, useState } from "react";

export const useThrottledValue = <T>(initialValue: T, onChange: (value: T) => void, throttleTime: number) => {
    const timeout = useRef<NodeJS.Timeout>();

    const [value, setValue_] = useState(initialValue);
    
    const setValue = (newValue: T) => {
        setValue_(newValue);

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            onChange(newValue);
            timeout.current = undefined;
        }, throttleTime);
    };

    useEffect(() => {
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    useEffect(() => {
        setValue_(initialValue);

        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    }, [initialValue]);


    return [value, setValue] as const;
};
