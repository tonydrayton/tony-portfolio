import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

const inter = Inter({ subsets: ["latin"] });

const openGraph: OpenGraph = {
    title: "Tony Drayton",
    description: "Portfolio",
    locale: "en_US",
    type: "website",
    url: "https://tonydrayton.dev",
    siteName: "Tony Drayton",
    // images: [
    //     {
    //         url: "https://cdn.discordapp.com/emojis/1096246554479837225.png",
    //         width: 480,
    //         height: 480,
    //         alt: "Tony Drayton"
    //     }
    // ]
}

const twitter: Twitter = {
    card: "summary_large_image",
    title: "Tony Drayton",
    description: "Portfolio",
    creator: "@tonydrayton",
    site: "@tonydrayton",
    // images: [
    //     {
    //         url: "https://cdn.discordapp.com/emojis/1096246554479837225.png",
    //         width: 480,
    //         height: 480,
    //         alt: "Tony Drayton"
    //     }
    // ]
}

export const metadata: Metadata = {
    title: "Tony Drayton",
    description: "Portfolio",
    openGraph: openGraph,
    twitter: twitter
};

export const viewport: Viewport = {
    themeColor: "#ffffff0",
    viewportFit: "cover"
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]">
            <body className={`h-full ${inter.className}`}>
                <ThemeProvider attribute="class">
                    <Theme accentColor="teal">
                        {children}
                    </Theme>
                </ThemeProvider>
            </body>
        </html>
    );
}
