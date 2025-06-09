"use client";
import { cn } from "@/lib/utils";
import MotionBlurFade from "../ui/MotionBlurFade";
import { ChevronDown, Github, Linkedin, Mail, MapPinIcon, SendIcon } from "lucide-react";
import { TextGenerateEffect } from "../ui/generate-effect";
import { animate, motion, useInView, Variants } from "framer-motion";
import { ShinyAnchor, ShinyButton } from "../ui/shiny-button";
import MailTo from "../MailTo";
import { Button } from "../ui/button";
import Container from "../Container";
import About from "./about";
import ProjectSummary from "./projects";
import AnimatedGridPattern from "../ui/animated-grid-pattern";
import { CSSProperties, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import SideNav from "../side-nav";
import ExperienceSection from "./experience";
import SocialSideNav from "../social-side-nav";
import { ContainerTextFlip } from "../ui/container-flip-text";
import { Spotlight } from "../ui/spotlight";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import dynamic from "next/dynamic";
import ChromeGrid from "../ui/chrome-grid";

const childVariants: Variants = {
	hidden: { y: 6, opacity: 0, filter: `blur(6px)` },
	visible: { y: 0, opacity: 1, filter: `blur(0px)` },
};


export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	// Wait for animations to finish before displaying the 3D grid
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, []);
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
	const aboutSectionRef = useRef<HTMLDivElement | null>(null);
	const aboutSectionInView = useInView(aboutSectionRef, { once: true, amount: 0.1 });
	const hasAnimatedRef = useRef(false);

	return (
		<main className="overflow-hidden">
			<SideNav />
			<SocialSideNav />
			<MotionBlurFade>
				<motion.div variants={childVariants} className="h-svh w-screen relative">
					{!isLoading && <ChromeGrid />}
					<Container className="absolute top-0 flex-col items-center !justify-start">
						{/* <Spotlight /> */}
						<div className="absolute flex md:flex-row flex-col items-center gap-4 md:gap-10 px-4 mt-16 sm:mt-32 md:mt-28 lg:px-6 lg:max-w-7xl">
							<div className="lg:max-w-3xl flex flex-col gap-1 md:gap-2 items-start">
								<p className="text-muted-foreground flex flex-row gap-2">
									<MapPinIcon /> Philadelphia, PA
								</p>
								<div className="flex flex-row items-center gap-2">
									<h1 className="text-3xl lg:text-6xl font-semibold tracking-tight flex flex-row flex-wrap gap-1 lg:gap-2 items-center lg:mb-2">
										Building
										<ContainerTextFlip
											words={["bridges", "bonds", "ties", "links"]}
											animationDuration={1000}
											className="text-3xl lg:text-6xl mx-1"
										/>
										{["between", "design", "and", "code"].map((word, index) => (
											<span key={index}>{word}</span>
										))}
									</h1>
								</div>

								<div className="flex flex-row flex-wrap items-center gap-x-1">
									<p className="text-lg lg:text-xl text-left text-primary/80">{"I'm"}</p>
									<HoverCard openDelay={200}>
										<div className="flex items-center gap-3">
											<div className="space-y-0.5">
												<HoverCardTrigger asChild>
													<p>
														<a
															className={cn(
																"text-lg lg:text-xl text-left text-primary/80",
																"hover:text-primary/100 dark:hover:text-primary/70 transition-all duration-200 ease-in-out",
																"dark:hover:animate-shiny-text dark:bg-clip-text dark:bg-no-repeat dark:bg-position-[0_0] dark:bg-size-[var(--shiny-width)_100%] dark:[transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
																"dark:hover:bg-linear-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
															)}
															href="#"
															style={{
																"--shiny-width": "50px",
															} as CSSProperties}
														>
															{"Tony Drayton,"}
														</a>
													</p>
												</HoverCardTrigger>
											</div>
										</div>
										<HoverCardContent className="">
											<div className="space-y-3">
												<div className="flex items-center gap-3">
													<img
														className="shrink-0 object-top rounded-full pointer-events-none select-none"
														src="assets/me/IMG_4698.jpg"
														width={40}
														height={40}
														alt="Avatar"
													/>
													<div className="space-y-0.5">
														<p className="text-sm font-medium">Tony Drayton</p>
														<p className="text-muted-foreground text-xs">@tony</p>
													</div>
												</div>
												<p className="text-muted-foreground text-sm">
													Computer science student at{" "}
													<strong className="text-foreground font-medium">Drexel University</strong>.
													Anticipated graduation in 2027.
												</p>
											</div>
										</HoverCardContent>
									</HoverCard>
									{["a", "computer", "science", "student", "by", "day", "and", "developer", "by", "night"].map((word, index) => (
										<span key={index} className="text-lg lg:text-xl text-left text-primary/80">{word}</span>
									))}
								</div>
								<div className="hero-items mt-2 flex flex-row gap-2">
									<ShinyAnchor className="bg-neutral-50/80 dark:bg-neutral-900/80" href="/assets/resumes/Tony_Drayton_10_25_24" target="_blank">
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
											<Mail className="brightness-90 group-hover:brightness-110 transition-all ease-in-out duration-100 cursor-pointer" />
										</Button>
									</MailTo>
								</div>
							</div>
						</div>
					</Container>
				</motion.div>

				<div className="my-20" />

				<Container className="flex-col items-center justify-start" id="experience">
					<ExperienceSection />
				</Container>

				<Separator orientation="horizontal" className="mt-20" />

				<Container className="flex-col items-center justify-start" id="about">
					<About aboutSectionRef={aboutSectionRef} />
				</Container>

				<Separator orientation="horizontal" className="mt-20" />

				<Container className="flex-col items-center" id="projects" >
					<ProjectSummary />
				</Container>

				<div className="shrink-0 bg-border h-px w-full my-10" />
				<footer className="flex flex-col gap-4 justify-center items-center w-full p-4 text-center" id="contact">
					<span className="font-bold tracking-tight text-2xl">Looking to collaborate or hiring?</span>
					<span className="text-base sm:text-xl mb-10 flex flex-row items-center gap-1">
						<ShinyButton
							className="bg-neutral-50/80 dark:bg-neutral-900/80 hover:cursor-pointer"
							onClick={(e) => {
								e.preventDefault();
								window.location.href = "mailto:tonydrytn@gmail.com"
							}}>
							<SendIcon className="size-4" />
							Get in touch with me
						</ShinyButton>
					</span>
					<span className="text-muted-foreground w-full text-sm">Built with ❤️‍🔥 by Tony Drayton</span>
				</footer>
			</MotionBlurFade>
		</main>
	)
}
