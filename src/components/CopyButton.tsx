"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
    text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <button
            disabled={isCopied}
            onClick={copy}
            className="p-2 hover:bg-slate-800 rounded-md transition-all duration-200 border border-transparent hover:border-slate-700 group"
            aria-label="Copy code"
        >
            {isCopied ? (
                <Check className="w-4 h-4 text-green-400" />
            ) : (
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            )}
        </button>
    );
};
