import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { TerminalFooter } from "@/components/TerminalFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { KatanaLoader } from "@/components/KatanaLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Murat Bahadır Kayıhan | Mobile & Backend Developer",
    description: "Senior Mobile & Backend Developer. Engineering software that actually works.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.variable}>
                <KatanaLoader />
                <Navbar />
                <CommandPalette />
                {children}
                <TerminalFooter />
            </body>
        </html>
    );
}
