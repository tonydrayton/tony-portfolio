import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import { tealHex } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const openGraph: OpenGraph = {
	title: "Home",
	description: "Portfolio",
	locale: "en_US",
	type: "website",
	url: "https://tonydrayton.dev",
	siteName: "Tony Drayton", // Author on Discord
	images: [
		{
			url: "https://cdn.discordapp.com/emojis/1096246554479837225.png",
			width: 480,
			height: 480,
			alt: "Tony Drayton"
		}
	]
}

const twitter: Twitter = {
	card: "summary_large_image",
	title: "Home",
	description: "Portfolio",
	creator: "@tonydrayton",
	site: "@tonydrayton",
	images: [
		{
			url: "https://cdn.discordapp.com/emojis/1096246554479837225.png",
			width: 480,
			height: 480,
			alt: "Tony Drayton"
		}
	]
}

export const metadata: Metadata = {
	title: "Home",
	description: "Portfolio",
	openGraph: openGraph,
	twitter: twitter,
	icons: {
		apple: "https://cdn.discordapp.com/emojis/1096246554479837225.png"
	}
};



export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]">
			<body className={`h-full ${inter.className}`}>
				<ThemeProvider attribute="class" defaultTheme="dark">
					<Theme grayColor="mauve">
						{children}
					</Theme>
				</ThemeProvider>
			</body>
		</html>
	);
}
