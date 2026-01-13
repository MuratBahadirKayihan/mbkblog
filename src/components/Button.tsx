import React from "react";
import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
    onClick?: () => void;
}

export const Button = ({ children, href, variant = "primary", className = "", onClick }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300";

    const variants = {
        primary: "bg-primary text-white hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]",
        secondary: "bg-secondary text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(124,58,237,0.3)]",
        outline: "border border-white/20 hover:border-primary hover:text-primary bg-transparent",
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedClasses}>
            {children}
        </button>
    );
};
