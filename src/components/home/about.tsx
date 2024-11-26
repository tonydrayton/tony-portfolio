import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Timeline } from "../ui/timeline";
import { SiAmazonwebservices, SiAmazonwebservicesHex, SiMailgun, SiMailgunHex, SiMysql, SiMysqlHex, SiNodedotjs, SiNodedotjsHex, SiTypescript, SiTypescriptHex } from "@icons-pack/react-simple-icons";
import { ClassValue } from "clsx";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import MailgunEventDocumentationImage from "../../../public/assets/experience/mailgun_event_documentation.png";
import { PersonStanding } from "lucide-react";
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
							props: { color: SiMailgunHex }, // Additional props for the icon
						}}
						name="Webhook Handler"
						description="Designed and implemented a webhook mail handler (AWS Lambda function) using the Mailgun API, which handles all transactional and event mail for the platform"
						href="/"
						className="col-span-3 lg:col-span-2"
					/>
					<BentoCard
						icon={{
							element: PersonStanding,
							className: "dark:text-white"
						}}
						name="Events"
						description="Went to inperson Alumni reunion events, such as the annual UPenn Alumni Reunion & Drexel's 50-year reunion of the Class of 1973, as support staff"
						href="/"
						className="col-span-3 lg:col-span-2"
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
			<TabsContent value="about" className="max-w-[30rem] p-4 flex flex-col">
				<p>
					{"Hey, I'm Tony Drayton, a third year Computer Science student at Drexel University. I'm passionate about creating beautiful and functional websites and applications."}
				</p>
				<p>
					I specialize in front-end development and have experience with back-end development as well.
				</p>
			</TabsContent>
			<TabsContent value="experience" className="lg:max-w-[80rem]">
				<Timeline data={data} />
			</TabsContent>
		</Tabs>
	)
}
