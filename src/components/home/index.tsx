"use client";
import { cn } from "@/lib/utils";
import MotionBlurFade from "../ui/MotionBlurFade";
import { ChevronDown, Github, Linkedin, Mail, MapPinIcon, SendIcon } from "lucide-react";
import { TextGenerateEffect } from "../ui/generate-effect";
import { animate, motion, useInView } from "framer-motion";
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
		<>
			<SideNav />
			<SocialSideNav />
			<Container className="flex-col items-center min-h-screen">
				<AnimatedGridPattern
					numSquares={10}
					maxOpacity={0.1}
					duration={2}
					repeatDelay={1}
					className={cn(
						"mask-[radial-gradient(350px_circle_at_50%_50%,white,transparent)] md:mask-[radial-gradient(500px_circle_at_50%_50%,white,transparent)]",
						"inset-0 absolute skew-y-12 h-screen opacity-90",
					)}
				/>
				<MotionBlurFade>
					<div className="flex md:flex-row flex-col items-center gap-4 md:gap-10">
						<div className="flex flex-col gap-4 md:gap-2 items-center md:items-start">
							<div className="flex flex-row items-center gap-2">
								<h1 className="text-3xl">Tony Drayton</h1>
							</div>
							<p className="text-muted-foreground flex flex-row gap-2">
								<MapPinIcon /> Philadelphia, PA
							</p>
							<TextGenerateEffect 
								className="max-w-72 my-2 text-center md:text-left" 
								words="A computer science student that loves frontend development" 
								onComplete={() => {
									if (!hasAnimatedRef.current) {
										hasAnimatedRef.current = true;
										animate(".hero-items", {
											opacity: 1,
											filter: 'blur(0px)',
										}, {
											duration: 0.75,
											ease: 'easeInOut',
											delay: 1,
										})
									}
								}}
							/>
							<motion.div
								initial={{
									opacity: 0,
									filter: 'blur(10px)'
								}}
								className="hero-items flex flex-row gap-2"
							>
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
										<Mail className="brightness-90 group-hover:brightness-110 transition-all ease-in-out duration-100" />
									</Button>
								</MailTo>
							</motion.div>
						</div>
					</div>
				</MotionBlurFade>
				<motion.div
				className={cn(
					"relative -bottom-52",
				)}
				initial={{
					opacity: 0,
					y: 10
				}}
				animate={
					aboutSectionInView
					? {
						opacity: 0,
						y: 10
					}
					: {
						opacity: 1,
						y: 0,
						transition: {
							duration: 0.75,
							delay: 5,
							ease: 'easeInOut',
							repeat: Infinity,
							repeatType: 'reverse'
						}
					}
				}
				>
					<ChevronDown className="scale-125" />
					<span className="sr-only">Scroll down</span>
				</motion.div>
			</Container>

			<Container className="flex-col items-center justify-start" id="about">
				<About aboutSectionRef={aboutSectionRef} />
			</Container>

			<Container className="flex-col items-center justify-start" id="experience">
				<ExperienceSection />
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
		</>
	)
}
