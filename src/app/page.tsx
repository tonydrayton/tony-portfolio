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
import Tilt from 'react-parallax-tilt';

import awsLogo from "../../public/logos/amazon.svg";
import reactLogo from "../../public/logos/react.svg";
import cLogo from "../../public/logos/c.svg";
import flaskLogo from "../../public/logos/flask.svg";
import dockerLogo from "../../public/logos/docker.svg";
import javaLogo from "../../public/logos/java.svg";
import jQueryLogo from "../../public/logos/jquery.svg";
import jsLogo from "../../public/logos/JS.svg";
import mongodbLogo from "../../public/logos/mongodb.svg";
import nodejsLogo from "../../public/logos/nodejs.svg";
import pythonLogo from "../../public/logos/Python.svg";
import tailwindLogo from "../../public/logos/tailwind.svg";
import typescriptLogo from "../../public/logos/TypeScript.svg";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import StaggeredText from "@/components/animation/StaggeredText";
import Timeline from "@/components/Timeline";

const entries = [
	{ date: 'Jan 2022 - Present', title: 'Software Engineer', description: 'Working on various projects...' },
	{ date: 'June 2020 - Dec 2021', title: 'Intern', description: 'Focused on front-end development...' },
	// Add more entries as needed
  ];

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

			<Container className="flex-col items-center min-h-dvh">
				<MotionBlurFade>
					<div className="flex md:flex-row flex-col items-center gap-4 md:gap-10">
						<Tilt transitionSpeed={1000}>

							<Image
								src={me1}
								width={100}
								alt="Tony"
								className="w-40 rounded-full shadow-lg"
							/>
						</Tilt>

						<div className="flex flex-col gap-4 md:gap-2 items-center md:items-start">
							<h1 className="text-4xl">Hello! <span className="ec ec-wave"></span>
							</h1>
							<h1 className="text-3xl">My name is Tony Drayton</h1>
							<p className="max-w-72 text-center md:text-left">{"I'm computer science student that loves software engineering and animals"}</p>
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
			{/* <Container className="flex-col items-center min-h-screen">
			<Timeline entries={entries} />

			</Container> */}

			{/* <Container className="flex-col items-center min-h-screen">
				<StaggeredText text="My Techstack" className="text-3xl p-4"/>
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
					className="w-96 md:w-1/3"
					style={{
						maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
					}}
				>
					<InfiniteCarousel logos={[awsLogo, reactLogo, cLogo, flaskLogo, dockerLogo, javaLogo ]} />
					<InfiniteCarousel logos={[ jQueryLogo, jsLogo, mongodbLogo, nodejsLogo, pythonLogo, tailwindLogo, typescriptLogo ]} />
				</motion.div>
			</Container> */}
		</>
	);
}
