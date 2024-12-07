import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Timeline } from "../ui/timeline";
import { SiAmazonwebservices, SiGit, SiMailgun, SiMailgunHex, SiMysql, SiNextdotjs, SiNodedotjs, SiPython, SiReact, SiTypescript } from "@icons-pack/react-simple-icons";
import { ClassValue } from "clsx";
import { CalendarDaysIcon, HourglassIcon, PersonStanding } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { WakatimeSummaryResult } from "@/lib/types";
import { useEffect, useState } from "react";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import NumberTicker from "../ui/number-ticker";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const aboutSkills = [
	{
		icon: <SiTypescript className="scale-75" />,
		name: "TypeScript",
		description: "JavaScript with syntax for types"
	},
	{
		icon: <SiNodedotjs className="scale-75" />,
		name: "Node.js",
		description: "JavaScript runtime environment"
	},
	{
		icon: <SiReact className="scale-75" />,
		name: "React",
		description: "Library for web user interfaces"
	},
	{
		icon: <SiNextdotjs className="scale-75" />,
		name: "Next.js",
		description: "Framework for React"
	},
	{
		icon: <SiPython className="scale-75" />,
		name: "Python",
		description: "Programming language"
	},
	{
		icon: <SiGit className="scale-75" />,
		name: "Git",
		description: "Version Control"
	}
]

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
			<TabsList className="grid grid-cols-2 mx-auto lg:w-[30rem] md:w-80 w-72 bg-black/5 dark:bg-white/5 transition-all duration-300">
				<TabsTrigger value="about">About</TabsTrigger>
				<TabsTrigger value="experience">Experience</TabsTrigger>
			</TabsList>
			<TabsContent value="about" className="lg:max-w-[80rem] p-4 flex flex-col">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-10">
					<Card className="col-span-1 bg-[var(--color-background)] dark:shadow-sleek dark:border-none p-2">
						<CardHeader>
							<CardTitle className="text-2xl">Background</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-row gap-4">
							<div className="flex flex-col gap-2">
								<span>{"Hey, I'm Tony Drayton, a third year Computer Science student at Drexel University."}</span>
								<div className="mt-6 flex flex-col gap-2">
									<Badge className="w-fit" variant="secondary">Currently</Badge>
									<span>
										{"Working on "}
										<span className="font-semibold">DragonGPT</span>
										{", an AI powered chatbot for Drexel students."}
									</span>
									<Button variant="ringHover" asChild>
										<Link href="https://dragon-gpt-fe.vercel.app/" target="_blank">Check out the live demo</Link>
									</Button>
								</div>


							</div>
						</CardContent>
					</Card>
					<Card className="col-span-1 bg-[var(--color-background)] dark:shadow-sleek dark:border-none p-2">
						<CardHeader>
							<CardTitle className="text-2xl">My Go-Tos</CardTitle>
						</CardHeader>
						<CardContent>
						These are the technologies I frequently use
							<div className="mt-4 grid grid-cols-2 gap-4">
								{aboutSkills.map((skill, index) => (
									<div key={index} className="flex flex-row gap-1">
										{skill.icon}
										<div className="flex flex-col">
											<span>{skill.name}</span>
											<span className="text-muted-foreground text-xs">{skill.description}</span>
										</div>
									</div>
								))}
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
				<div
					className={cn(
						"group shadow-sm w-fit mx-auto rounded-full border border-black/5 bg-green-200/60 text-base text-white transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-green-900/40 dark:hover:bg-neutral-800",
					)}
				>
					<AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out text-green-600 dark:text-green-500 hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 text-sm sm:text-base">
						<span>☘️ Currently looking for a new position!</span>
						{/* <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" /> */}
					</AnimatedShinyText>
				</div>
				<Timeline data={data} />
			</TabsContent>
		</Tabs>
	)
}
