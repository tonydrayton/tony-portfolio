/* eslint-disable @next/next/no-async-client-component */
"use client";
import Backdrop from "@/components/Backdrop";
import Container from "@/components/Container";
import { Viewport } from "next";
import { tealHex } from "@/lib/utils";
import './page.css';
import MotionBlurFade from "@/components/ui/MotionBlurFade";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Nav from "@/components/Nav";
import me1 from "../../public/me/IMG_4698.jpg";
import { Avatar } from "@radix-ui/themes";
import Image from "next/image";
import { motion } from 'framer-motion'
import scenery from "../../public/blue-purple-bg.png"
import { ChevronDown } from "lucide-react";


export const viewport: Viewport = {
	themeColor: tealHex, // specific viewport color for home page
	viewportFit: "cover"
}

export default function Home() {
	const { socket, initializeSocket } = useUserStore();

	useEffect(() => {
		if (!socket) {
			initializeSocket();
		}
		return () => {
			useUserStore.getState().clearHeartbeat();
		};
	}, [socket, initializeSocket]);
	return (
		<>
			<div>
				<Nav />
				<Image src={scenery} alt="blur background" className="rotate-180 -z-10 absolute inset-0 dark:brightness-50 -hue-rotate-90  opacity-60 dark:opacity-100 pointer-events-none" style={{ maskImage: 'linear-gradient(to top, black, transparent)' }} />
			</div>

			<Container className="flex-col items-center min-h-screen">
				<MotionBlurFade>
					<div className="flex md:flex-row flex-col items-center gap-4 md:gap-10">
						<Avatar
							size={{
								lg: "9",
								md: "8",
								sm: "8",
								initial: "8"
							}}
							src={me1.src}
							alt="Tony"
							fallback="T"
							radius="full"

							className="rounded-full shadow-lg"
						/>
						<div className="flex flex-col gap-4 md:gap-2 items-center md:items-start">
							<h1 className="text-4xl">Tony Drayton</h1>
							<p className="max-w-72 text-center md:text-left">A computer science student that loves software engineering and animals</p>
						</div>
					</div>
				</MotionBlurFade>
				{/* <motion.div
					className="self-center w-8"
					initial={{
						opacity: 0
					}}
					animate={{
						opacity: [0, 50, 0],
						y: [0, 10, 0],
					}}
					transition={{
						delay: 2,
						duration: 2,
						repeat: Infinity,
						repeatType: 'loop',
						ease: 'easeInOut',
					}}
					exit={{
						opacity: 0
					}}
				>
					<ChevronDown className="fixed mt-60 w-8 h-8" />
				</motion.div> */}
			</Container >

			<Container className="flex-col items-center min-h-screen">
				<motion.div
					initial={{
						opacity: 0,
					}}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 3,
							ease: [0, 0.71, 0.2, 1.01]
						}
					}}
					viewport={{ once: true }}
				>
					<p>hi</p>
				</motion.div>
			</Container>
		</>
	);
}
