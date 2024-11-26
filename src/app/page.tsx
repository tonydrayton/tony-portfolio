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
import ProjectSummary from "@/components/home/ProjectSummary";
import MailTo from "@/components/MailTo";
import { Button } from "@/components/ui/button";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { TextGenerateEffect } from "@/components/ui/generate-effect";
import ShinyButton from "@/components/ui/shiny-button";
import About from "@/components/home/about";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Home from "@/components/home";

export default function Page() {


	// useGLTF.preload('/assets/models/macbook_pro_13_inch_2020/scene.gltf');

	return (
		<>
			<div>
				<Nav />
				{/* <Image src={scenery} alt="blur background" className="rotate-180 -z-10 absolute inset-0 dark:brightness-50 -hue-rotate-90  opacity-60 dark:opacity-100 pointer-events-none" style={{ maskImage: 'linear-gradient(to top, black, transparent)' }} /> */}
			</div>


			<Home />
		</>
	);
}
