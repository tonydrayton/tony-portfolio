import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

const inter = Inter({ subsets: ["latin"] });

const openGraph: OpenGraph = {
    title: "Tony Drayton",
    description: "Portfolio",
    images: [
        {
            url: "https://cdn.discordapp.com/emojis/1096246554479837225.png",
            width: 480,
            height: 480
        }
    ],
    locale: "en_US",
    type: "website"
}

export const metadata: Metadata = {
    title: "Tony Drayton",
    description: "Portfolio",
    openGraph: openGraph
};


export const viewport: Viewport = {
    themeColor: "#ffffff0"
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider attribute="class">
                    <Theme accentColor="teal">
                        {children}
                    </Theme>
                </ThemeProvider>
            </body>
        </html>
    );
}
