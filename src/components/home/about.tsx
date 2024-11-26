import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Timeline } from "../ui/timeline";
import { SiAmazonwebservices, SiAmazonwebservicesHex, SiFigma, SiGit, SiMailgun, SiMailgunHex, SiMysql, SiMysqlHex, SiNextdotjs, SiNodedotjs, SiNodedotjsHex, SiPython, SiPythonHex, SiReact, SiReactHex, SiTypescript, SiTypescriptHex } from "@icons-pack/react-simple-icons";
import { ClassValue } from "clsx";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import MailgunEventDocumentationImage from "../../../public/assets/experience/mailgun_event_documentation.png";
import { PersonStanding } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
SiAmazonwebservices
SiTypescript
SiNodedotjs
SiMysql

const iconClassName: ClassValue = "scale-75 mr-1 rounded-sm"
const data = [
	{
		logo: "/alumniq_logo.png",
		title: "Junior Software Engineer",
		workplace: { name: "AlumnIQ", url: "https://www.alumniq.com" },
		date: "April 2024 - Sep. 2024",
		skills: [{ icon: <SiTypescript color={SiTypescriptHex} className={iconClassName} />, name: "TypeScript" }, { icon: <SiNodedotjs color={SiNodedotjsHex} className={iconClassName} />, name: "Node.js" }, { icon: <SiMysql color={SiMysqlHex} className={iconClassName} />, name: "MySQL" }, { icon: <SiAmazonwebservices className={iconClassName} />, name: "AWS" }],
		content: (
			<div>
				{/* <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
					Using the
					<span className="inline-flex items-baseline">
						<SiMailgun color={SiMailgunHex} className="scale-50 md:scale-75 rounded-sm relative top-2" />
						Mailgun API
					</span>
					, I designed and implemented a webhook mail handler which handles all transactional and event mail for the platform
				</p> */}
				<BentoGrid className="grid-cols-3 lg:grid-cols-4">
					<BentoCard
						icon={{
							element: SiMailgun,
							className: "dark:text-white scale-75"
						}}
						name="Webhook Handler"
						description="Designed and implemented a webhook mail handler (AWS Lambda function) using the Mailgun API, which handles all transactional and event mail for the platform"
						href="/"
						className="col-span-3 lg:col-span-2"
						transitions={false}
					/>
					<BentoCard
						icon={{
							element: PersonStanding,
							className: "dark:text-white scale-75"
						}}
						name="Events"
						description="Went to inperson Alumni reunion events, such as the annual UPenn Alumni Reunion & Drexel's 50-year reunion of the Class of 1973, as support staff"
						href="/"
						className="col-span-3 lg:col-span-2"
						transitions={false}
					/>
				</BentoGrid>
			</div>
		),
	},
];

export default function About() {
	return (
		<Tabs defaultValue="about" className="lg:max-w-[80rem] mt-20">
			<TabsList className="grid grid-cols-3 mx-auto lg:w-[30rem] md:w-80 w-72 bg-black/5 dark:bg-white/5 transition-all duration-300">
				<TabsTrigger value="about">About</TabsTrigger>
				<TabsTrigger value="experience">Experience</TabsTrigger>
				<TabsTrigger value="education">Education</TabsTrigger>
			</TabsList>
			<TabsContent value="about" className="lg:max-w-[80rem] p-4 flex flex-col">
				<div className="grid md:grid-cols-2 gap-4">
					<Card className="col-span-1 bg-[var(--color-background)] dark:border-neutral-800 p-4">
						<CardHeader>
							<CardTitle className="text-2xl">Quick Background</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-2"><span>{"Hey, I'm Tony Drayton, a third year (20 years old) Computer Science student at Drexel University."}</span><span> {"I'm passionate about creating beautiful and functional websites and applications."}</span>
						<span>
							I have been coding since I was 13 years old, starting with just JavaScript and now knowing many different languages and frameworks.</span></CardContent>
					</Card>
					<Card className="col-span-1 bg-[var(--color-background)] dark:border-neutral-800 p-4">
						<CardHeader>
							<CardTitle className="text-2xl">My Go-Tos</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-row items-center gap-2">
									<SiTypescript color={SiTypescriptHex} className="scale-75" />
									<span>TypeScript</span>
								</div>
								<div className="flex flex-row items-center gap-2">
									<SiNodedotjs color={SiNodedotjsHex} className="scale-75" />
									<span>Node.js</span>
								</div>
								<div className="flex flex-row items-center gap-2">
									<SiReact color={SiReactHex} className="scale-75" />
									<span>React</span>
								</div>
								<div className="flex flex-row items-center gap-2">
									<SiNextdotjs className="scale-75" />
									<span>Next.js</span>
								</div>
								<div className="flex flex-row items-center gap-2">
									<SiPython color={SiPythonHex} className="scale-75" />
									<span>Python</span>
								</div>
								<div className="flex flex-row items-center gap-2">
									<SiGit className="scale-75" />
									<span>Git</span>
								</div>
							</div>
						</CardContent>
						<CardFooter className="text-sm text-muted-foreground">
							These are the technologies I frequently use
						</CardFooter>
					</Card>

				</div>
			</TabsContent>
			<TabsContent value="experience" className="lg:max-w-[80rem]">
				<Timeline data={data} />
			</TabsContent>
			<TabsContent value="education" className="max-w-[30rem] p-4 flex flex-col">

			</TabsContent>
		</Tabs>
	)
}
