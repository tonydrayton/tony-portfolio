import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SiAmazonwebservices, SiApachecassandra, SiApachecassandraHex, SiCommonworkflowlanguage, SiGit, SiMailgun, SiMailgunHex, SiMysql, SiNextdotjs, SiNodedotjs, SiNodedotjsHex, SiPython, SiReact, SiReactHex, SiTypescript, SiTypescriptHex } from "@icons-pack/react-simple-icons";
import { ClassValue } from "clsx";
import { CalendarDaysIcon, HourglassIcon, SquareArrowOutUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { WakatimeSummaryResult } from "@/lib/types";
import { CSSProperties, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import NumberTicker from "../ui/number-ticker";
import Link from "next/link";
import { Button } from "../ui/button";
import Marquee from "../ui/marquee";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { AnimatedDBCard, EventsCard, MailCard } from "./experience/feature-cards";
import AnimatedShinyText from "../ui/animated-shiny-text";

interface Skill {
	icon: JSX.Element;
	name: string;
	description: string;
}

const aboutSkills: Skill[] = [
	{
		icon: <SiTypescript className="h-10 w-10 peer-hover:text-blue-400" />,
		name: "TypeScript",
		description: "JavaScript with syntax for types"
	},
	{
		icon: <SiNodedotjs className="h-10 w-10" />,
		name: "Node.js",
		description: "JavaScript runtime environment"
	},
	{
		icon: <SiReact className="h-10 w-10" />,
		name: "React",
		description: "Library for web user interfaces"
	},
	{
		icon: <SiNextdotjs className="h-10 w-10" />,
		name: "Next.js",
		description: "Framework for React"
	},
	{
		icon: <SiPython className="h-10 w-10" />,
		name: "Python",
		description: "Programming language"
	},
	{
		icon: <SiGit className="h-10 w-10" />,
		name: "Git",
		description: "Version Control"
	}
]

const SkillCard = ({ skill }: { skill: Skill }) => {
	return (
		<TooltipProvider delayDuration={50}>
			<Tooltip>
				<TooltipTrigger className="cursor-default">
					<div className="flex flex-col justify-center items-center border dark:border-neutral-800 rounded-lg p-4 w-28 gap-2 shadow-md peer">
						{skill.icon}
						<span className="text-muted-foreground text-xs">{skill.name}</span>
					</div>
				</TooltipTrigger>
				<TooltipContent className={cn(
					"backdrop-blur-sm border bg-black/50 text-white border-neutral-300",
					"dark:bg-white/5 dark:text-white dark:border-neutral-700",
				)}>
					{skill.description}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

const firstSkills = aboutSkills.slice(0, aboutSkills.length / 2);
const secondSkills = aboutSkills.slice(aboutSkills.length / 2);

const iconClassName: ClassValue = "scale-75 mr-1 rounded-sm"
const experienceData = [
	{
		logo: "/comcast_logo.png",
		title: "Software Engineer Intern",
		workplace: { name: "Comcast", url: "https://www.xfinity.com" },
		date: "April 2025 - Present",
		skills: [{ icon: <SiTypescript className={iconClassName} fill={SiTypescriptHex} />, name: "TypeScript" }, { icon: <SiApachecassandra className={iconClassName} fill={SiApachecassandraHex} />, name: "Cassandra" }, { icon: <SiAmazonwebservices className={iconClassName} />, name: "AWS" }],
		cards: [
			<AnimatedDBCard />,
			<div className="max-w-sm flex justify-center items-center p-2">
				+ more to come
			</div>
		]
	},
	{
		logo: "/alumniq_logo.png",
		title: "Junior Software Engineer",
		workplace: { name: "AlumnIQ", url: "https://www.alumniq.com" },
		date: "April 2024 - Sep. 2024",
		skills: [{ icon: <Image src="/logos/coldfusion.png" alt="ColdFusion logo" width={25} height={25} className={iconClassName} />, name: "ColdFusion" }, { icon: <SiMysql className={iconClassName} />, name: "MySQL" }, { icon: <SiAmazonwebservices className={iconClassName} />, name: "AWS" }],
		cards: [
			<MailCard />,
			<EventsCard />,
		]
	}
];

export default function About({
	aboutSectionRef
}: {
	aboutSectionRef: React.RefObject<HTMLDivElement>
}) {
	const [wakatimeStats, setWakatimeStats] = useState<WakatimeSummaryResult | null>(null);

	const getWakatimeStats = async () => {
		const res = await fetch('/api/getWakatimeStats');
		const data = await res.json() as WakatimeSummaryResult;
		return data;
	}

	useEffect(() => {
		getWakatimeStats().then(data => setWakatimeStats(data)).catch(err => console.error(err));
	}, []);

	return (
		<Tabs defaultValue="about" className="lg:max-w-7xl mt-20" ref={aboutSectionRef}>
			<TabsList className="rounded-xl grid grid-cols-2 mx-auto lg:w-120 md:w-80 w-72 bg-black/5 dark:bg-white/5 transition-all duration-300">
				<TabsTrigger value="about" className="rounded-lg">About</TabsTrigger>
				<TabsTrigger value="experience" className="rounded-lg">Experience</TabsTrigger>
			</TabsList>
			<TabsContent value="about" className="lg:max-w-7xl p-4 flex flex-col">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-10">
					<Card className="col-span-1 bg-(--color-background) dark:shadow-sleek dark:border-none p-2">
						<CardHeader>
							{/* <div className="mask hover:mask-[unset] transition-all">
								<img
								src="https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=2805&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="Background"
								className="rounded-lg"
								/>
							</div> */}
							<CardTitle className="text-2xl">Background</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-row gap-4">
							<div className="flex flex-col gap-2">
								<span>{"I'm Tony Drayton, a third year Computer Science student at Drexel University."}</span>
								<span>{"∙ Interning at "}
									<span className="inline font-semibold drop-shadow-md">Comcast</span>
									{" as a Software Engineer this spring."}
								</span>
								<span>
									{"∙ Currently working on DragonGPT, an AI powered chatbot for Drexel students."}
								</span>
								<Button variant="default" asChild>
									<Link href="https://dragon-gpt-fe.vercel.app/" target="_blank" className="flex flex-row gap-1 mt-2">
										Check out the live demo
										<SquareArrowOutUpRight className="scale-75" />
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
					<Card className="col-span-1 bg-(--color-background) dark:shadow-sleek dark:border-none p-2 overflow-hidden">
						<CardHeader>
							<CardTitle className="text-2xl">My Go-Tos</CardTitle>
						</CardHeader>
						<CardContent>
							These are the technologies I frequently use
							{/* <div className="mt-4 grid grid-cols-2 gap-4">
								{aboutSkills.map((skill, index) => (
									<div key={index} className="flex flex-row gap-1">
										{skill.icon}
										<div className="flex flex-col">
											<span>{skill.name}</span>
											<span className="text-muted-foreground text-xs">{skill.description}</span>
										</div>
									</div>
								))}
							</div> */}
							<div className="mt-4 relative flex flex-col overflow-hidden">
								<Marquee pauseOnHover>
									{firstSkills.map((skill, index) => (
										<SkillCard skill={skill} key={index} />
									))}
								</Marquee>
								<Marquee reverse pauseOnHover>
									{secondSkills.map((skill, index) => (
										<SkillCard skill={skill} key={index} />

									))}
								</Marquee>
								<div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-white dark:from-background"></div>
								<div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-white dark:from-background"></div>
							</div>
						</CardContent>
					</Card>
					<div className="col-span-1 grid grid-cols-2 sm:grid-rows-2 sm:grid-cols-none gap-2">
						<Card className="col-span-1 sm:row-span-1 bg-(--color-background) dark:shadow-sleek dark:border-none p-2">
							<CardHeader>
								<CardTitle className="text-2xl flex flex-row items-center gap-2">
									<HourglassIcon />Hours
								</CardTitle>
								<p className="text-xs text-muted-foreground">Coded since last year</p>
							</CardHeader>
							<CardContent className="flex items-center justify-center text-3xl font-mono">
								{wakatimeStats
									?
									<Link href="https://wakatime.com/@tonydrayton" target="_blank" className="hover:scale-110 transition-transform ease-in-out">
										<NumberTicker value={parseInt(wakatimeStats?.data.human_readable_total.split(' ')[0])} />
									</Link>
									: "--"
								}
							</CardContent>
						</Card>
						<Card className="col-span-1 sm:row-span-1 bg-(--color-background) dark:shadow-sleek dark:border-none p-2">
							<CardHeader>
								<CardTitle className="text-2xl flex flex-row items-center gap-2">
									<CalendarDaysIcon />Daily
								</CardTitle>
							</CardHeader>
							<CardContent className="flex items-center justify-center text-lg md:text-3xl font-mono">
								{wakatimeStats
									?
									<Link href="https://wakatime.com/@tonydrayton" target="_blank" className="hover:underline transition-all text-center">
										{wakatimeStats.data.human_readable_daily_average}
									</Link>
									: "--"
								}
							</CardContent>
						</Card>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="experience" className="max-w-full px-2 md:px-6 lg:max-w-7xl">
				{/* <div
					className={cn(
						"group shadow-xs w-fit mx-auto rounded-full border border-black/5 bg-green-200/60 text-base text-white transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-green-900/40 dark:hover:bg-neutral-800",
					)}
				>
					<AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out text-green-600 dark:text-green-500 hover:text-neutral-600 hover:duration-300 dark:hover:text-neutral-400 text-sm sm:text-base">
						<span>☘️ Currently looking for a new position!</span>
					</AnimatedShinyText>
				</div> */}

				<div className="mt-10 flex flex-col gap-10 md:gap-8 w-full">
					{experienceData.map((exp, index) => (
						<div className="flex flex-col md:flex-row md:gap-4" key={index}>
							<div className="sticky w-40 pt-1 text-sm text-muted-foreground">{exp.date}</div>
							<div className="flex flex-col gap-2">
								<p className="text-lg font-semibold tracking-tight">{exp.title} @
									<Link 
										href={exp.workplace.url} 
										target="_blank" 
										className={cn(
											"ml-1 text-primary/70",
											"hover:text-primary/100 dark:hover:text-primary/70 transition-all duration-200 ease-in-out",
											"dark:hover:animate-shiny-text dark:bg-clip-text dark:bg-no-repeat dark:bg-position-[0_0] dark:bg-size-[var(--shiny-width)_100%] dark:[transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
											"dark:hover:bg-linear-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
										)}
										style={{
											"--shiny-width": "75px",
										} as CSSProperties}
									>
										{exp.workplace.name}
									</Link>
								</p>
								{/* <div className="flex flex-row flex-wrap gap-2 mb-2">
									{exp.skills.map((skill, index) => (
										<Badge variant="outline" className="flex flex-row gap-1 items-center" key={index}>
											{skill.icon}
											{skill.name}
										</Badge>
									))}
								</div> */}
								<div className="flex flex-col md:flex-row gap-4 max-w-3xl">
									{exp.cards.map((card, index) => (
										<>{card}</>
									))}
								</div>
							</div>

						</div>
					))}
					<div className="w-[1px] bg-muted-foreground/50" />
				</div>
			</TabsContent>
		</Tabs>
	)
}


