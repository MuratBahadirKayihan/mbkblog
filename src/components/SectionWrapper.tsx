import React from "react";

interface SectionWrapperProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
}

export const SectionWrapper = ({ children, id, className = "" }: SectionWrapperProps) => {
    return (
        <section
            id={id}
            className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${className}`}
        >
            {children}
        </section>
    );
};
