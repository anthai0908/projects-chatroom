import { useState, useEffect } from "react";

export interface WindowDimension {
    height: number;
    width: number;
}

export const useWindowDimensions = (): WindowDimension => {
    const [dimension, setDimension] = useState<WindowDimension>({
        height: window.innerHeight,  // Set initial dimensions to current window size
        width: window.innerWidth,
    });

    const handleResize = () => {
        setDimension({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        // Call the resize handler once to set initial dimensions
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return dimension;
};
