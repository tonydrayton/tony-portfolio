"use client";
import { cn } from "@/lib/utils";
import MotionBlurFade from "../ui/MotionBlurFade";
import { Github, Linkedin, Mail, MapPinIcon } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { ShinyAnchor } from "../ui/shiny-button";
import { Button } from "../ui/button";
import { Container } from "../Container";
import { CSSProperties, useEffect, useRef, useState } from "react";
import SideNav from "../side-nav";
import ExperienceSection from "./experience";
import SocialSideNav from "../social-side-nav";
import { ContainerTextFlip } from "../ui/container-flip-text";
import ChromeGrid from "../ui/chrome-grid";
import Image from "next/image";
import { Footer } from "./footer";
import Projects from "./projects-new";
import { HybridTooltip, HybridTooltipContent, HybridTooltipTrigger, TouchProvider } from "../ui/hybrid-tooltip";
import { TooltipProvider } from "../ui/tooltip";
import FAQ from "./faq";

const useDevicePerformance = () => {
	const [canHandleGrid, setCanHandleGrid] = useState(true);

	useEffect(() => {
		const cores = navigator.hardwareConcurrency || 4;
		const memory = (navigator as any).deviceMemory || 4;
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		const canvas = document.createElement('canvas');
		const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		const hasWebGL = !!gl;

		const pixelRatio = window.devicePixelRatio || 1;
		const shouldEnableGrid =
			hasWebGL && // Must have WebGL
			(
				(!isMobile && cores >= 4 && memory >= 4) || // Desktop with good specs
				(isMobile && cores >= 4 && memory >= 4 && pixelRatio <= 3) // High-end mobile
			);

		setCanHandleGrid(shouldEnableGrid);

		return () => {
			if (gl) {
				const glContext = gl as WebGLRenderingContext;
				const ext = glContext.getExtension('WEBGL_lose_context');
				if (ext) ext.loseContext();
			}
			canvas.remove();
		};
	}, []);

	return canHandleGrid;
};

const childVariants: Variants = {
	hidden: { y: 6, opacity: 0, filter: `blur(6px)` },
	visible: { y: 0, opacity: 1, filter: `blur(0px)` },
};

export default function Home() {
	const [showGrid, setShowGrid] = useState(false);
	const canHandleGrid = useDevicePerformance();

	// Wait for animations to finish before displaying the 3D grid
	useEffect(() => {
		if (!canHandleGrid) return;

		const timer = setTimeout(() => {
			setTimeout(() => {
				setShowGrid(true);
			}, 500);
		}, 500);

		return () => clearTimeout(timer);
	}, [canHandleGrid]);

	const experienceSectionRef = useRef<HTMLDivElement | null>(null);
	const experienceSectionInView = useInView(experienceSectionRef, { once: true, amount: 0.9 });

	return (
		<main className="overflow-hidden">
			<SideNav />
			<SocialSideNav />
			<MotionBlurFade>
				<motion.div variants={childVariants} className="h-svh w-screen relative">
					{showGrid && canHandleGrid && <ChromeGrid />}
					<Container className="absolute top-0 flex-col items-center !justify-start pointer-events-none" id="hero">
						<div className="absolute flex md:flex-row flex-col items-center gap-4 md:gap-10 px-4 mt-24 sm:mt-32 md:mt-76 lg:px-6 lg:max-w-7xl">
							<div className="lg:max-w-3xl flex flex-col gap-1 md:gap-2 items-start">
								<p className="text-muted-foreground flex flex-row gap-2 pointer-events-auto">
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
									<TouchProvider>
										<TooltipProvider>
									<HybridTooltip delayDuration={200}>
										<div className="flex items-center gap-3">
											<div className="space-y-0.5">
												<HybridTooltipTrigger className="pointer-events-auto cursor-pointer">
													<p
														className={cn(
															"text-lg lg:text-xl text-left text-primary/80",
															"hover:text-primary/100 dark:hover:text-primary/70 transition-all duration-200 ease-in-out",
															"dark:hover:animate-shiny-text dark:bg-clip-text dark:bg-no-repeat dark:bg-position-[0_0] dark:bg-size-[var(--shiny-width)_100%] dark:[transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
															"dark:hover:bg-linear-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
															)}
															style={{
																"--shiny-width": "50px",
															} as CSSProperties}
														>
															{"Tony Drayton,"}
														</p>
												</HybridTooltipTrigger>
											</div>
										</div>
										<HybridTooltipContent className="dark:bg-background/85">
											<div className="space-y-3">
												<div className="flex items-center gap-3">
													<Image
														className="shrink-0 object-top rounded-full pointer-events-none select-none"
														src="/assets/me/IMG_4698.jpg"
														width={40}
														height={40}
														alt="Avatar"
														loading="eager"
														priority
													/>
													<div className="space-y-0.5">
														<p className="text-sm font-medium text-primary">Tony Drayton</p>
														<p className="text-muted-foreground text-xs">@tony</p>
													</div>
												</div>
												<p className="text-muted-foreground text-sm">
													Computer science student at{" "}
													<strong className="text-foreground font-medium">Drexel University</strong>.
													Anticipated graduation in 2027.
												</p>
											</div>
										</HybridTooltipContent>
									</HybridTooltip>
									</TooltipProvider>
									</TouchProvider>
									{["a", "computer", "science", "student", "by", "day", "and", "developer", "by", "night"].map((word, index) => (
										<span key={index} className="text-lg lg:text-xl text-left text-primary/80">{word}</span>
									))}
								</div>
								<div className="hero-items mt-2 flex flex-row gap-2 pointer-events-auto">
									<ShinyAnchor className="bg-neutral-50/80 dark:bg-neutral-900/80" href="/assets/resumes/Tony_Drayton_10_25_24.pdf" target="_blank">
										Resume
									</ShinyAnchor>
									<a href="https://github.com/tonydrayton" target="_blank" className="relative group p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
										<Github />
									</a>
									<a href="https://www.linkedin.com/in/tony-drayton/" target="_blank" className="relative group p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
										<Linkedin />
									</a>
									<a
										href="mailto:tonydrytn@gmail.com" className="p-1 hover:cursor-pointer group transition-all ease-in-out duration-300"
									>
										<Button variant="ghost" className="p-0 h-[unset]">
											<Mail className="brightness-90 group-hover:brightness-110 transition-all ease-in-out duration-100 cursor-pointer" />
										</Button>
									</a>
								</div>
							</div>
						</div>	
					</Container>
					<motion.div 
						className="pointer-events-none relative -top-48 w-full flex justify-center"
						initial={{ opacity: 0 }}
						animate={
							experienceSectionInView ? {
								opacity: 0,
							} : {
								opacity: 1,
								transition: {
									duration: 0.75,
									delay: 5,
									ease: "easeInOut",
								}
							}
						}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouse-icon lucide-mouse">
							<rect x="5" y="2" width="14" height="20" rx="7" />
							<path d="M12 6v4">
								<animateTransform
									attributeName="transform"
									attributeType="XML"
									type="translate"
									from="0 0"
									to="0 2"
									dur="1s"
									repeatCount="indefinite"
									additive="sum"
									values="0 0; 0 2; 0 0"
									keyTimes="0; 0.5; 1"
								/>
							</path>
						</svg>
						<span className="sr-only">Scroll down</span>
					</motion.div>		
				</motion.div>

				<div ref={experienceSectionRef} className="my-20" />

				<Container className="flex-col items-center justify-start" id="experience">
					<ExperienceSection />
				</Container>

				{/* <Container className="flex-col items-center justify-start" id="about">
					<About aboutSectionRef={aboutSectionRef} />
				</Container> */}

				{/* <Container className="flex-col items-center" id="projects" >
					<ProjectSummary />
				</Container> */}

				<Container className="flex-col items-center justify-start" id="projects">
					<Projects />
				</Container>

				<Container className="flex-col items-center justify-start" id="faq">
					<FAQ />
				</Container>

				<div className="shrink-0 h-px w-full my-10" />

				<Footer />
			</MotionBlurFade>
		</main>
	)
}
