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
		skills: [{ icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { name: "Azure" }, { name: "OpenAI" }],
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
		name: 'Test & Survey System',
		role: 'Developer',
		skills: [{ name: "Java" }, { name: "JUnit" }, { name: "StarUML" }],
		date: 'September 2024 - December 2024',
		description: 'A test and survey system curated for students and teachers to create and manage tests and surveys. Fully developed in a Java backend with an extensive UML to diagram how it functions.',
		link: {
			url: 'https://github.com/tonydrayton',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		},
	},
	{
		name: 'Mock Banking',
		role: 'Developer',
		skills: [{ name: "Java" }, { name: "JUnit" }],
		date: 'September 2023 - December 2023',
		description: 'A mock bank system built to simulate a real bank system. It allows users to create accounts, deposit and withdraw money, and view their transaction history.',
		link: {
			url: 'https://github.com/tonydrayton',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		},
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
		name: 'Music at Drexel',
		type: 'Website',
		role: 'Fullstack Developer',
		skills: [{ name: "React" }, { name: "MongoDB" }, { name: "Express" }, { name: "Node.js" }],
		date: 'January - June 2023',
		description: 'A platform for students at Drexel University to connet with each other and share their music. Included features such as direct Spotify integration, scheduling concerts & events, finding other artists, and more.',
		image: '/projects/musicatdrexel/logo.png',
		link: {
			url: 'https://github.com/tonydrayton',
		}
	},
	{
		name: 'Digital Icon Market',
		type: 'Website',
		role: 'Fullstack Developer',
		skills: [{ icon: <SiPayloadcms className={iconClassName} />, name: "Payload CMS" }, { icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { icon: <SiTrpc className={iconClassName} />, name: "TRPC" }],
		date: 'December 2022 - January 2023',
		description: 'A lightweight icon market for users to buy and sell digital icons. Developed fully in TypeScript utilizing Next.js, Payload CMS, and TRPC for backend connectivity.',
		image: '/projects/digitaliconmarket/logo.png',
		link: {
			url: 'https://github.com/tonydrayton/digitalmarket',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		}
	},
	{
		name: 'Vaeleth',
		type: 'Discord Bot',
		role: 'Main Developer',
		skills: [{ name: "Discord.js" }, { name: "Node.js" }, { name: "SQLite" }],
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
				<p className="text-base text-muted-foreground">All of the projects I have worked on, spanning from the past to the present.</p>
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
										<HybridTooltipContent side="top" className="flex flex-col gap-2 max-w-80 sm:w-lg!">
											<div className="flex flex-row items-center gap-2">
												{project.image && (
													<a href={project.link.url} target="_blank">
														<Image
															src={project.image}
															alt={`${project.name} logo`}
															width={75}
															height={75}
															className="w-full max-w-10 rounded-sm bg-transparent object-center object-contain"
															loading="eager"
															priority
														/>
													</a>
												)}
												<div>
													<div className="flex flex-row gap-2 items-center">
														<a href={project.link.url} target="_blank" className="text-base text-primary/90 no-underline underline-offset-2 hover:text-primary hover:underline hover:brightness-120 transition-all duration-200 ease-in-out max-w-40 sm:max-w-40 md:max-w-60 truncate">{project.name}</a>
													</div>
													<p className="text-xs text-muted-foreground">{project.role}</p>
												</div>
											</div>
											<p className="text-sm text-primary/90 text-balance">{project.description}</p>
											<p className="text-xs text-muted-foreground">{project.skills.map((skill) => skill.name).join(", ")}</p>
										</HybridTooltipContent>
									</HybridTooltip>
								</TooltipProvider>
							</TouchProvider>
							<span className="text-xs text-muted-foreground ml-2">{project.date}</span>
						</li>
					))}
				</AnimatedGroup>
				<p className="mt-2 text-xs text-muted-foreground">Hover or click on a project to learn more about it</p>
			</div>
		</div>
	)
}
