import { Badge } from "@/components/ui/badge";
import { SiFlask, SiNextdotjs, SiPayloadcms, SiTrpc, SiTypescript } from "@icons-pack/react-simple-icons"
import { Github } from "lucide-react";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { HybridTooltip, HybridTooltipContent, HybridTooltipTrigger, TouchProvider } from "../ui/hybrid-tooltip";
import { TooltipProvider } from "../ui/tooltip";
import { AnimatedGroup } from "../ui/animated-group";

const iconClassName = "size-3 mr-1";
const projects = [
	{
		name: 'DragonGPT',
		type: 'Website',
		role: 'Frontend Developer',
		skills: [{ icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }],
		date: 'October 2024 - March 2025',
		description: 'A website built for Drexel students, developed by students. You can ask any question you could imagine about Drexel, whether it be about classes or clubs, and you will find your answer here.',
		image: '/projects/dragongpt/dragongptlogo.webp',
		link: {
			url: 'https://github.com/drexelai/dragon-gpt-fe',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		},
		footer: 'Drexel 2024 Codefest Project'
	},
	{
		name: 'Sigma Scholar',
		type: 'Website',
		role: 'Frontend Developer',
		skills: [{ icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { icon: <SiFlask className={iconClassName} />, name: "Flask" }],
		date: 'March 2025',
		description: 'Drexel 2025 Codefest project. A website committed to aiding children in their academic journey with artificial intelligence',
		image: '/projects/sigmascholar/logo.png',
		link: {
			url: 'https://github.com/tonydrayton/sigmascholar-frontend',
		}
	},
	{
		name: 'Adopteam',
		type: 'Website',
		role: 'Frontend Developer',
		skills: [{ icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { icon: <SiFlask className={iconClassName} />, name: "Flask" }],
		date: 'April 2024',
		description: 'Drexel 2024 Codefest project. A website dedicated to finding loving homes for children in need through the power of AI',
		image: '/projects/adopteam/logo.png',
		link: {
			url: 'https://github.com/kxllydo/codefest24-25',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		},
		footer: 'Drexel 2024 Codefest Project'
	},
	{
		name: 'Digital Icon Market',
		type: 'Website',
		role: 'Fullstack Developer',
		skills: [{ icon: <SiPayloadcms className={iconClassName} />, name: "Payload CMS" }, { icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { icon: <SiTrpc className={iconClassName} />, name: "TRPC" }],
		date: 'October - December 2023',
		description: 'A lightweight icon market for users to buy and sell digital icons.',
		image: '/projects/digitaliconmarket/logo.png',
		link: {
			url: 'https://github.com/tonydrayton/digitalmarket',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		}
	},
	{
		name: 'Music at Drexel',
		type: 'Website',
		role: 'Fullstack Developer',
		skills: [{ icon: <SiPayloadcms className={iconClassName} />, name: "Payload CMS" }, { icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { icon: <SiTrpc className={iconClassName} />, name: "TRPC" }],
		date: 'January - June 2023',
		description: 'A platform for students at Drexel University to connet with each other and share their music',
		image: '/projects/musicatdrexel/logo.png',
		link: {
			url: 'https://github.com/tonydrayton',
		}
	},
	{
		name: 'Vaeleth',
		type: 'Discord Bot',
		role: 'Main Developer',
		skills: [{ icon: <SiPayloadcms className={iconClassName} />, name: "Payload CMS" }, { icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { icon: <SiTrpc className={iconClassName} />, name: "TRPC" }],
		date: 'February 2019 - January 2022',
		description: 'A multipurpose Discord bot built to enhance your Discord experience. At its peak, it was in over 300 servers with over 500,000 users total.',
		image: '/projects/vaeleth/logo.png',
		link: {
			url: 'https://top.gg/bot/543565592527896596',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		}
	}
]

export default function Projects() {
	return (
		<div className="max-w-full w-full px-4 md:px-14 lg:max-w-4xl">
			<div className="mt-10 flex flex-col gap-2 w-full">
				<h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">Projects</h2>
				<p className="text-base text-muted-foreground">All of the projects I have worked on, spanning from the past to the present</p>
				<AnimatedGroup 
					as="ul"
					preset="blur-slide"
					className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-4"
				>
					{projects.map((project, index) => (
						<li key={index} className="flex flex-row items-center">
							<TouchProvider>
								<TooltipProvider>
									<HybridTooltip delayDuration={200}>
										<HybridTooltipTrigger className="text-primary/95 hover:text-primary transition-all duration-200 ease-in-out hover:cursor-pointer">
											{project.name}
										</HybridTooltipTrigger>
										<HybridTooltipContent side="top" className="dark:bg-background/70 flex flex-col gap-2 max-w-80 sm:w-lg!">
											<div className="flex flex-row items-center gap-2">
												<div>
													<Image
														src={project.image}
														alt={`${project.name} logo`}
														width={75}
														height={75}
														className="w-full max-w-10 rounded-sm bg-transparent object-center object-contain"
														loading="eager"
														priority
													/>
												</div>
												<div>
													<div className="text-sm flex flex-row gap-2 items-center">
														<a href={project.link.url} target="_blank" className="text-primary/90 underline sm:no-underline hover:text-primary sm:hover:underline hover:brightness-120 transition-all duration-200 ease-in-out max-w-24 sm:max-w-40 truncate">{project.name}</a>
														<p className="text-xs text-muted-foreground">({project.type})</p>
													</div>
													<p className="text-xs text-muted-foreground">{project.role}</p>
												</div>
											</div>
											<p className="text-sm text-primary/90">{project.description}</p>
										</HybridTooltipContent>
									</HybridTooltip>
									</TooltipProvider>
							</TouchProvider>
							<span className="text-xs text-muted-foreground ml-2">{project.date}</span>
						</li>
					))}
				</AnimatedGroup>
			</div>
		</div>
	)
}
