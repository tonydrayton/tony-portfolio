"use client";
import { cn } from "@/lib/utils";
import MotionBlurFade from "../ui/MotionBlurFade";
import { Github, Linkedin, Mail, MapPinIcon } from "lucide-react";
import { TextGenerateEffect } from "../ui/generate-effect";
import { motion } from "framer-motion";
import { ShinyAnchor } from "../ui/shiny-button";
import MailTo from "../MailTo";
import { Button } from "../ui/button";
import Container from "../Container";
import About from "./about";
import ProjectSummary from "./project-summary";
import AnimatedGridPattern from "../ui/animated-grid-pattern";
import { useEffect, useState } from "react";
import { useResumeStore } from "@/stores/useResumeStore";

export default function Home() {
	// Initiate a socket connection to the Lanyard API, not using atm
	// const { socket, initializeSocket, userData } = useUserStore();

	// useEffect(() => {
	// 	if (!socket) {
	// 		initializeSocket();
	// 	}
	// 	return () => {
	// 		console.log('Clearing heartbeat');
	// 		useUserStore.getState().clearHeartbeat();
	// 	};
	// }, [socket, initializeSocket]);
	const { resume, setResume } = useResumeStore();

	useEffect(() => {
			getResumeURL();
	}, []);

	const getResumeURL = async () => {
		try {
			const response = await fetch('/api/getLatestResume');
				const blob = await response.blob();
				const url = URL.createObjectURL(blob);
				setResume(url);
		} catch (error) {
			console.error('Error fetching or opening PDF', error);
		}
	};

	return (
		<>
			<Container className="flex-col items-center min-h-screen">
				<AnimatedGridPattern
					numSquares={10}
					maxOpacity={0.1}
					duration={2}
					repeatDelay={1}
					className={cn(
						"[mask-image:radial-gradient(350px_circle_at_50%_50%,white,transparent)] md:[mask-image:radial-gradient(500px_circle_at_50%_50%,white,transparent)]",
						"inset-0 absolute skew-y-12 h-screen opacity-90",
					)}
				/>
				<MotionBlurFade>
					<div className="flex md:flex-row flex-col items-center gap-4 md:gap-10">
						{/* <Tilt transitionSpeed={1000}>

							<Image
								src={me1}
								width={100}
								alt="Tony"
								className="w-40 rounded-full shadow-lg"
							/>
						</Tilt> */}

						<div className="flex flex-col gap-4 md:gap-2 items-center md:items-start">
							<div className="flex flex-row items-center gap-2">
								<h1 className="text-3xl">Tony Drayton</h1>
								{/* {userData && statusMap[userData.discord_status]
									? (
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Circle
														fill={getStatusColor(userData.discord_status)}
														color=""
														size={15}
														className="ml-2 transition-all" />
												</TooltipTrigger>
												<TooltipContent className="transition-all">
													{statusMap[userData.discord_status].text}
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									)
									:
									<Circle
										fill="gray"
										color=""
										size={15}
										className="ml-2 transition-all" />} */}
							</div>
							<p className="text-muted-foreground flex flex-row gap-2">
								<MapPinIcon /> Philadelphia, PA
							</p>
							<TextGenerateEffect className="max-w-72 my-2 text-center md:text-left" words="A computer science student that loves frontend development" />
							<motion.div
								initial={{
									opacity: 0,
									filter: 'blur(10px)'
								}}
								animate={{
									opacity: 1,
									filter: 'blur(0px)',
									transition: {
										duration: 0.75,
										delay: 1.9,
										ease: 'easeInOut'
									}
								}}
								className="flex flex-row gap-2"
							>
								<ShinyAnchor className="bg-neutral-50/80 dark:bg-neutral-900/80" href={resume} target="_blank">
										Resume
								</ShinyAnchor>
								<a href="https://github.com/tonydrayton" target="_blank" className="relative group p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
									<Github />
								</a>
								<a href="https://www.linkedin.com/in/tony-drayton/" target="_blank" className="relative group p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
									<Linkedin />
								</a>
								<MailTo
									mailto="mailto:tonydrayton43@gmail.com" className="p-1 hover:cursor-pointer group transition-all ease-in-out duration-300"
								>
									<Button variant="ghost" className="p-0 h-[unset]">
										<Mail className="brightness-90 group-hover:brightness-110 transition-all ease-in-out duration-100" />
									</Button>
								</MailTo>
							</motion.div>
						</div>
					</div>
				</MotionBlurFade>
			</Container>

			<Container className="flex-col items-center justify-start" id="about">
				<About />
			</Container>

			<Container className="mt-20 flex-col items-center" id="projects" >
				<ProjectSummary />
			</Container>

			<div className="shrink-0 bg-border h-[1px] w-full my-10" />
			<footer className="flex flex-col justify-center items-center w-full p-4 text-center">
				<span className="font-bold tracking-tight text-2xl">Looking to collaborate or hiring a frontend developer?</span>
				<span className="text-lg sm:text-xl mb-10">Shoot me an email at tonydrayton43@gmail.com</span>
				<span className="text-muted-foreground w-full text-sm">Built with ❤️‍🔥 by Tony Drayton</span>
			</footer>
		</>
	)
}
