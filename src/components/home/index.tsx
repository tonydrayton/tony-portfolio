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
import { useRef } from "react";
import { Separator } from "../ui/separator";
import SideNav from "../side-nav";
import ExperienceSection from "./experience";
import SocialSideNav from "../social-side-nav";
import { ContainerTextFlip } from "../ui/container-flip-text";
import { Spotlight } from "../ui/spotlight";
import { ChromeGrid } from "../ui/chrome-grid";

const childVariants: Variants = {
	hidden: { y: 6, opacity: 0, filter: `blur(6px)` },
	visible: { y: 0, opacity: 1, filter: `blur(0px)` },
};

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
	const aboutSectionRef = useRef<HTMLDivElement | null>(null);
	const aboutSectionInView = useInView(aboutSectionRef, { once: true, amount: 0.1 });
	const hasAnimatedRef = useRef(false);

	return (
		<main className="overflow-hidden">
			<SideNav />
			<SocialSideNav />
			<MotionBlurFade>
				<motion.div variants={childVariants} className="h-svh w-screen relative">
					<ChromeGrid />
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

								<p className="text-lg lg:text-xl text-left text-primary/80">{"I'm Tony Drayton, a computer science student by day and developer by night"}</p>
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

				<motion.div variants={childVariants}>
					<Container className="flex-col items-center justify-start" id="experience">
						<ExperienceSection />
					</Container>
				</motion.div>

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
