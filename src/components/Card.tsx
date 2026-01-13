import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
    return (
        <div className={`glass rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.02] ${className}`}>
            {children}
        </div>
    );
};
