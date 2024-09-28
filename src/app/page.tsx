/* eslint-disable @next/next/no-async-client-component */
import Backdrop from "@/components/Backdrop";
import Container from "@/components/Container";
import HomePage from "@/components/HomePage";
import { Viewport } from "next";
import { tealHex } from "@/lib/utils";
import './page.css';

export const viewport: Viewport = {
	themeColor: tealHex, // specific viewport color for home page
	viewportFit: "cover"
}

export default function Home() {
	return (
		<>
			<Container className="flex-col">
				<HomePage />
			</Container >
			<Backdrop />
		</>
	);
}
