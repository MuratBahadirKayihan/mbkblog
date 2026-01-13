import { useState, useEffect } from "react";

export const useTypewriter = (text: string, speed: number = 50, startDelay: number = 0) => {
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        // Initial start delay
        const startTimeout = setTimeout(() => {
            setIsTyping(true);
            let currentIndex = 0;

            const typeChar = () => {
                if (currentIndex < text.length) {
                    setDisplayText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeout = setTimeout(typeChar, speed);
                } else {
                    setIsTyping(false);
                    setIsComplete(true);
                }
            };

            typeChar();
        }, startDelay);

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(timeout);
        };
    }, [text, speed, startDelay]);

    return { displayText, isTyping, isComplete };
};
