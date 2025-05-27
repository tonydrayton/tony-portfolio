import Image from "next/image";
import { SiGit, SiNextdotjs, SiNodedotjs, SiPython, SiReact, SiTypescript } from "@icons-pack/react-simple-icons";
import { CalendarDaysIcon, HourglassIcon, SquareArrowOutUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { WakatimeSummaryResult } from "@/lib/types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import NumberTicker from "../ui/number-ticker";
import Link from "next/link";
import { Button } from "../ui/button";
import Marquee from "../ui/marquee";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";

interface Skill {
	icon: JSX.Element;
	name: string;
	description?: string;
}

const SkillCard = ({ skill }: { skill: Skill }) => {
	return (
		<TooltipProvider delayDuration={50}>
			<Tooltip>
				<TooltipTrigger className="cursor-default">
					<div className="flex flex-col justify-center items-center border dark:border-neutral-800 rounded-lg p-4 w-28 gap-2 shadow-md dark:shadow-white/10 peer">
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
const firstSkills = aboutSkills.slice(0, aboutSkills.length / 2);
const secondSkills = aboutSkills.slice(aboutSkills.length / 2);

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
		<div className="lg:max-w-7xl md:px-6" ref={aboutSectionRef}>
			<div className="lg:max-w-7xl p-4 flex flex-col gap-4 md:gap-0">
				<div className="w-full">
					<h3 className="text-5xl font-semibold tracking-tight text-left">about me</h3>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-10">
					<Card className="col-span-1 bg-(--color-background) dark:shadow-sleek dark:border-none p-2">
						<CardHeader>
							<CardTitle className="text-2xl">Background</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-row gap-4">
							<div className="text-primary/80 flex flex-col gap-2">
								<span>{"∙ I'm Tony Drayton, a third year Computer Science student at Drexel University"}</span>
								<div className="flex flex-row flex-wrap gap-1">
									{["∙", "Working", "at"].map((text, index) => (
										<p key={index} className="">{text}</p>
									))}
									<Badge variant="outline" className="w-fit font-semibold border border-border shadow rounded-lg bg-linear-to-br from-border/50 to-background px-2 py-1 text-xs flex items-center gap-1 hover:from-border/80">
										<Image src="/logos/comcast.png" alt="Comcast logo" width={15} height={15} className="inline mr-1" />
										Comcast
									</Badge>
									{["as", "a", "Software", "Engineer", "Intern"].map((text, index) => (
										<p key={index} className="">{text}</p>
									))}
								</div>
								<div className="flex flex-row flex-wrap gap-1">
									{["∙", "Currently", "working", "on"].map((text, index) => (
										<p key={index} className="">{text}</p>
									))}
									<Badge variant="outline" className="w-fit font-semibold border border-border shadow rounded-lg bg-linear-to-br from-border/50 to-background px-2 py-1 text-xs flex items-center gap-1 hover:from-border/80">
										<Image src="/logos/dragongpt.webp" alt="DragonGPT logo" width={15} height={15} className="inline mr-1" />
										DragonGPT
									</Badge>
									{["an", "AI", "powered", "chatbot", "for", "Drexel", "students"].map((text, index) => (
										<p key={index} className="">{text}</p>
									))}
								</div>
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
							<p className="text-primary/80">These are the technologies I frequently use</p>
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
			</div>
		</div>
	)
}


