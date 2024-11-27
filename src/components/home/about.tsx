import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Timeline } from "../ui/timeline";
import { SiAmazonwebservices, SiAmazonwebservicesHex, SiFigma, SiGit, SiMailgun, SiMailgunHex, SiMysql, SiMysqlHex, SiNextdotjs, SiNodedotjs, SiNodedotjsHex, SiPython, SiPythonHex, SiReact, SiReactHex, SiTypescript, SiTypescriptHex } from "@icons-pack/react-simple-icons";
import { ClassValue } from "clsx";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import MailgunEventDocumentationImage from "../../../public/assets/experience/mailgun_event_documentation.png";
import { PersonStanding } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import DrBeachPhoto from "../../../public/assets/me/dr_beach.jpg";

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
				<div className="grid md:grid-cols-2 gap-4 md:mt-10">
					<Card className="col-span-1 bg-[var(--color-background)] dark:border-neutral-800 p-4">
						<CardHeader>
							<CardTitle className="text-2xl tracking-normal">Quick Background</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-row gap-4">
							<Image src={DrBeachPhoto} alt="Dominican Republic Beach" className="rounded-lg w-40 h-60" quality={100} />
							<div className="flex flex-col gap-2">
								<span>{"Hey, I'm Tony Drayton, a third year (20 years old) Computer Science student at Drexel University."}</span><span> {"I'm passionate about creating beautiful and functional websites and applications."}</span>
								<span>
									I have been coding since I was 13 years old, starting with just JavaScript and now knowing many different languages and frameworks.</span>
							</div>
						</CardContent>
					</Card>
					<Card className="col-span-1 bg-[var(--color-background)] dark:border-neutral-800 p-4">
						<CardHeader>
							<CardTitle className="text-2xl tracking-normal">My Go-Tos</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4">
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
