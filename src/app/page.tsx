/* eslint-disable @next/next/no-async-client-component */
"use client";
import Container from "@/components/Container";
import { cn, getStatusColor, statusMap } from "@/lib/utils";
import './page.css';
import MotionBlurFade from "@/components/ui/MotionBlurFade";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Nav from "@/components/Nav";
import { motion } from 'framer-motion'
import { Circle, Github, Linkedin, Mail, MapPinIcon } from "lucide-react";

// import awsLogo from "../../public/logos/amazon.svg";
// import reactLogo from "../../public/logos/react.svg";
// import cLogo from "../../public/logos/c.svg";
// import flaskLogo from "../../public/logos/flask.svg";
// import dockerLogo from "../../public/logos/docker.svg";
// import javaLogo from "../../public/logos/java.svg";
// import jQueryLogo from "../../public/logos/jquery.svg";
// import jsLogo from "../../public/logos/JS.svg";
// import mongodbLogo from "../../public/logos/mongodb.svg";
// import nodejsLogo from "../../public/logos/nodejs.svg";
// import pythonLogo from "../../public/logos/Python.svg";
// import tailwindLogo from "../../public/logos/tailwind.svg";
// import typescriptLogo from "../../public/logos/TypeScript.svg";
import ProjectSummary from "@/components/home/ProjectSummary";
import MailTo from "@/components/MailTo";
import { Button } from "@/components/ui/button";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { TextGenerateEffect } from "@/components/ui/generate-effect";
import ShinyButton from "@/components/ui/shiny-button";
import About from "@/components/home/about";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const entries = [
	{ date: 'Jan 2022 - Present', title: 'Software Engineer', description: 'Working on various projects...' },
	{ date: 'June 2020 - Dec 2021', title: 'Intern', description: 'Focused on front-end development...' },
];

export default function Home() {
	const { socket, initializeSocket, userData } = useUserStore();

	useEffect(() => {
		if (!socket) {
			initializeSocket();
		}
		return () => {
			console.log('Clearing heartbeat');
			useUserStore.getState().clearHeartbeat();
		};
	}, [socket, initializeSocket]);

	// useGLTF.preload('/assets/models/macbook_pro_13_inch_2020/scene.gltf');

	return (
		<>
			<div>
				<Nav />
				{/* <Image src={scenery} alt="blur background" className="rotate-180 -z-10 absolute inset-0 dark:brightness-50 -hue-rotate-90  opacity-60 dark:opacity-100 pointer-events-none" style={{ maskImage: 'linear-gradient(to top, black, transparent)' }} /> */}
			</div>

			<Container className="flex-col items-center min-h-dvh">
			<AnimatedGridPattern
					numSquares={10}
					maxOpacity={0.1}
					duration={2}
					repeatDelay={1}
					className={cn(
					"[mask-image:radial-gradient(600px_circle_at_50%_50%,white,transparent)]",
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
							{userData && statusMap[userData.discord_status]
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
												<TooltipContent className="transition-all ">
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
										className="ml-2 transition-all" />}
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
									delay: 2,
									ease: 'easeInOut'
								}
							}}
							className="flex flex-row gap-2"
							>
								<ShinyButton className="bg-neutral-50/80 dark:bg-neutral-900/80">Resume</ShinyButton>
								<a href="https://github.com/tonydrayton" target="_blank" className="relative group p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
									<Github />
								</a>
								<a href="https://www.linkedin.com/in/tony-drayton/" target="_blank" className="relative group p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
									<Linkedin />
								</a>
								<MailTo
									mailto="mailto:tony.drayton@drexel.edu" className="p-1 hover:cursor-pointer group transition-all ease-in-out duration-300"
								>
									<Button variant="ghost" className="p-0 h-[unset]">
									<Mail className="brightness-90 group-hover:brightness-110 transition-all ease-in-out duration-100" />
									</Button>
								</MailTo>
							</motion.div>
						</div>



					</div>
				</MotionBlurFade>
				{/* <TechStack /> */}
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
			<Container className="flex-col items-center justify-start min-h-dvh h-[unset]" id="about">
				<About />
			</Container>

			<Container className="flex-col items-center min-h-screen" id="projects" >
				<ProjectSummary />
			</Container>

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
