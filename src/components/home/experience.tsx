import { cn } from "@/lib/utils";
import { SiAmazonwebservices, SiApachecassandra, SiApachecassandraHex, SiMysql, SiTypescript, SiTypescriptHex } from "@icons-pack/react-simple-icons";
import { ClassValue } from "clsx";
import Link from "next/link";
import { CSSProperties, useState } from "react";
import { AnimatedDBCard, ConfigFixCard, EventsCard, MailCard, OnboardDeviceCard, PresentationCard, TestsCard, UpdateFunctionsCard } from "./feature-cards";
import Image from "next/image";
import { TextAnimate } from "../ui/text-animate";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const iconClassName: ClassValue = "scale-75 mr-1 rounded-sm"
const experienceData = [
	{
		logo: "/comcast_logo.png",
		title: "Software Engineer Intern",
		workplace: { name: "Comcast", url: "https://www.xfinity.com" },
		date: "April 2025 - Present",
		skills: [{ icon: <SiTypescript className={iconClassName} fill={SiTypescriptHex} />, name: "TypeScript" }, { icon: <SiApachecassandra className={iconClassName} fill={SiApachecassandraHex} />, name: "Cassandra" }, { icon: <SiAmazonwebservices className={iconClassName} />, name: "AWS" }],
		text: "My step into the corporate world, which I've always romanticized from watching countless television shows. The first day was my orientation at the office in Center City (my location was the New Jersey office), and it was truly an adventure. In the coming days, I began to settle in with my new team. Sadly, there were no other interns at my office, but that didn't stop me from making friends with other teams. My workload consisted mostly of Python projects and scripts. Midway through my time there, I was assigned to a group with other interns from different locations, where we had a new project to work on. We were tasked with creating a pitch presentation detailing a new idea or feature for Comcast. Throughout the project, I had frequent meetings with the other interns where we worked on our pitch. Ultimately, we all went to the headquarters to present our project to other Comcast employees and officials. It was an enjoyable experience working for Comcast, and even though they have over 10,000 employees, you can tell they care about each one.",
		cards: [
			AnimatedDBCard,
			OnboardDeviceCard,
			ConfigFixCard,
			PresentationCard
		]
	},
	{
		logo: "/logos/alumniq_logo.png",
		title: "Junior Software Engineer",
		workplace: { name: "AlumnIQ", url: "https://www.alumniq.com" },
		date: "April 2024 - Sep. 2024",
		skills: [{ icon: <Image src="/logos/coldfusion.png" alt="ColdFusion logo" width={25} height={25} className={iconClassName} />, name: "ColdFusion" }, { icon: <SiMysql className={iconClassName} />, name: "MySQL" }, { icon: <SiAmazonwebservices className={iconClassName} />, name: "AWS" }],
		text: "My very first \"official\" job as a Software Engineer. I hate to admit it, but I was extremely nervous about taking on the position. I had seen the \"day-in-the-life\" videos of others with the same title, but I had no idea what the job actually entailed. The start was rocky, though I eventually settled in. In May of 2024, I finally met my team in person at a Drexel Reunion event, where we were serving as support staff. Seeing them all after months of online meetings made me feel much more connected to everyone. In the end, I loved my job and all of my coworkers there. I'm glad it was my first experience in the field, and I wouldn't replace it with anything. Thanks, Adam.",
		cards: [
			MailCard,
			EventsCard,
			UpdateFunctionsCard,
			TestsCard
		]
	}
];

export default function ExperienceSection() {
	const [showMoreStates, setShowMoreStates] = useState<boolean[]>(new Array(experienceData.length).fill(false));
	
	const toggleShowMore = (index: number) => {
		setShowMoreStates(prev => prev.map((state, i) => i === index ? !state : state));
	};

	return (
		<div className="max-w-full w-full px-4 md:px-14 lg:max-w-4xl">
			<div className="mt-10 flex flex-col gap-10 md:gap-8 w-full">
				<div className="relative">
					<h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">Experience</h2>
					{experienceData.map((exp, index) => {
						const showMore = showMoreStates[index];
						return (
							<div className="flex flex-col mb-4" key={index}>
								<div className="w-40 pt-1 text-sm text-muted-foreground h-fit">{exp.date}</div>
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
									<TextAnimate className="mb-2" animation="fadeIn" by="line" duration={0.7} once>
										{exp.text}
									</TextAnimate>
									{!showMore && <Button className="w-fit h-8 py-0 bg-background rounded-3xl text-xs" aria-label="Show More" onClick={() => toggleShowMore(index)}>
										<PlusIcon className="size-3 mr-2" />
										Show Work
									</Button>}
									{showMore && (
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
											{exp.cards.map((Card, index) => (
												<Card key={index} />
											))}
										</div>
									)}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
