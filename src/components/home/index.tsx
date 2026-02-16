"use client";
import MotionBlurFade from "../ui/MotionBlurFade";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { ShinyAnchor } from "../ui/shiny-button";
import { Button } from "../ui/button";
import { Container } from "../Container";
import { useEffect, useState } from "react";
import SideNav from "../side-nav";
import ExperienceSection from "./experience";
import SocialSideNav from "../social-side-nav";
import { ContainerTextFlip } from "../ui/container-flip-text";
import ChromeGrid from "../ui/chrome-grid";
import Image from "next/image";
import { Footer } from "./footer";
import Projects from "./projects-new";
import FAQ from "./faq";
import { RESUME_URL } from "@/lib/constants";
import { Status, StatusIndicator } from "../ui/status";

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

	return (
		<main className="overflow-hidden">
			<SideNav />
			<SocialSideNav />
			<MotionBlurFade>
				<motion.div variants={childVariants} className="h-svh w-screen relative">
					{showGrid && canHandleGrid && <ChromeGrid />}
					<Container className="absolute top-0 flex-col items-center !justify-start pointer-events-none" id="hero">
						<div className="absolute flex md:flex-row flex-col items-center gap-4 md:gap-10 px-4 md:px-14 lg:max-w-4xl mt-24 sm:mt-32 md:mt-24">
							<div className="lg:max-w-3xl flex flex-col gap-6 items-start">
								<div className="flex flex-row items-center gap-2">
									<Image
										src="/assets/me/headshot.webp"
										alt="Tony Drayton"
										width={40}
										height={40}
										className="w-8 h-8 rounded-full object-cover"
									/>
									<p className="text-muted-foreground flex flex-row gap-2 pointer-events-auto">
										Philadelphia, PA
									</p>
								</div>
								<div className="flex flex-row items-center gap-2">
									<h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight flex flex-row flex-wrap gap-1 lg:gap-2 items-center lg:mb-2">
										Building
										<ContainerTextFlip
											words={["bridges", "bonds", "ties", "links"]}
											animationDuration={1000}
											className="text-3xl md:text-5xl lg:text-6xl mx-1"
										/>
										{["between", "design", "and", "code"].map((word, index) => (
											<span key={index}>{word}</span>
										))}
									</h1>
								</div>

								<div className="flex flex-row flex-wrap items-center gap-x-1">
									<p className="text-lg lg:text-xl text-left text-primary/80">{"I'm Tony Drayton,"}</p>
									{["a", "student", "studying", "computer", "science", "at", "Drexel", "University.", "My", "primary", "focus", "is", "fullstack", "web", "development.", "I", "have", "completed", "two", "Software", "Engineering", "internships", "and", "will", "be", "interning", "at", "Vanguard", "in", "Pennsylvania", "this", "spring", "and", "summer."].map((word, index) => (
										<span key={index} className="text-lg lg:text-xl text-left text-primary mix-blend-difference md:leading-8">{word}</span>
									))}
								</div>
								<div className="hero-items mt-2 flex flex-row gap-2 pointer-events-auto">
									<ShinyAnchor className="bg-neutral-50/80 dark:bg-neutral-900/80" href={RESUME_URL} target="_blank">
										<Status status="online">
											<StatusIndicator />
										</Status>
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
				</motion.div>

				<Container className="-mt-16 lg:-mt-96 flex-col items-center justify-start" id="experience">
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
