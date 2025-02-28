import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Timeline } from "../ui/timeline";
import { SiAmazonwebservices, SiGit, SiMailgun, SiMailgunHex, SiMysql, SiNextdotjs, SiNodedotjs, SiPython, SiReact, SiTypescript } from "@icons-pack/react-simple-icons";
import { ClassValue } from "clsx";
import { CalendarDaysIcon, HourglassIcon, PersonStanding, SquareArrowOutUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { WakatimeSummaryResult } from "@/lib/types";
import { useEffect, useState } from "react";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import NumberTicker from "../ui/number-ticker";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Marquee from "../ui/marquee";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

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
					"backdrop-blur border bg-black/50 text-white border-neutral-300",
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
const data = [
	{
		logo: "/alumniq_logo.png",
		title: "Junior Software Engineer",
		workplace: { name: "AlumnIQ", url: "https://www.alumniq.com" },
		date: "April 2024 - Sep. 2024",
		skills: [{ icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNodedotjs className={iconClassName} />, name: "Node.js" }, { icon: <SiMysql className={iconClassName} />, name: "MySQL" }, { icon: <SiAmazonwebservices className={iconClassName} />, name: "AWS" }],
		content: (
			<div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
				{/* <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
					Using the
					<span className="inline-flex items-baseline">
						<SiMailgun color={SiMailgunHex} className="scale-50 md:scale-75 rounded-sm relative top-2" />
						Mailgun API
					</span>
					, I designed and implemented a webhook mail handler which handles all transactional and event mail for the platform
				</p> */}
				<Card className="col-span-3 lg:col-span-2 bg-[var(--color-background)] dark:shadow-sleek dark:border-none">
					<CardHeader>
						<CardTitle className="flex flex-row gap-2 items-center text-xl">
							<SiMailgun color={SiMailgunHex} /> Webhook Handler
						</CardTitle>
					</CardHeader>
					<CardContent>
						Designed and implemented a webhook mail handler (AWS Lambda function) using the Mailgun API, which handles all transactional and event mail for the platform
					</CardContent>
				</Card>
				<Card className="col-span-3 lg:col-span-2 bg-[var(--color-background)] dark:shadow-sleek dark:border-none">
					<CardHeader>
						<CardTitle className="flex flex-row gap-2 items-center text-xl">
							<PersonStanding /> Events
						</CardTitle>
					</CardHeader>
					<CardContent>
						{"Went to inperson Alumni reunion events, such as the annual UPenn Alumni Reunion and Drexel's 50-year reunion of the Class of 1973, as support staff"}
					</CardContent>
				</Card>
			</div>
		),
	},
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
		<Tabs defaultValue="about" className="lg:max-w-[80rem] mt-20" ref={aboutSectionRef}>
			<TabsList className="rounded-xl grid grid-cols-2 mx-auto lg:w-[30rem] md:w-80 w-72 bg-black/5 dark:bg-white/5 transition-all duration-300">
				<TabsTrigger value="about" className="rounded-lg">About</TabsTrigger>
				<TabsTrigger value="experience" className="rounded-lg">Experience</TabsTrigger>
			</TabsList>
			<TabsContent value="about" className="lg:max-w-[80rem] p-4 flex flex-col">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-10">
					<Card className="col-span-1 bg-[var(--color-background)] dark:shadow-sleek dark:border-none p-2">
						<CardHeader>
							{/* <div className="mask hover:[mask-image:unset] transition-all">
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
					<Card className="col-span-1 bg-[var(--color-background)] dark:shadow-sleek dark:border-none p-2 overflow-hidden">
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
								<div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-background"></div>
								<div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-background"></div>
							</div>
						</CardContent>
					</Card>
					<div className="col-span-1 grid grid-cols-2 sm:grid-rows-2 sm:grid-cols-none gap-2">
						<Card className="col-span-1 sm:row-span-1 bg-[var(--color-background)] dark:shadow-sleek dark:border-none p-2">
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
						<Card className="col-span-1 sm:row-span-1 bg-[var(--color-background)] dark:shadow-sleek dark:border-none p-2">
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
			<TabsContent value="experience" className="lg:max-w-[80rem]">
				{/* <div
					className={cn(
						"group shadow-sm w-fit mx-auto rounded-full border border-black/5 bg-green-200/60 text-base text-white transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-green-900/40 dark:hover:bg-neutral-800",
					)}
				>
					<AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out text-green-600 dark:text-green-500 hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 text-sm sm:text-base">
						<span>☘️ Currently looking for a new position!</span>
					</AnimatedShinyText>
				</div> */}

				<Timeline data={data} />
			</TabsContent>
		</Tabs>
	)
}
