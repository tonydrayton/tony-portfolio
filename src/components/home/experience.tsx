import { cn } from "@/lib/utils";
import { SiAmazonwebservices, SiApachecassandra, SiApachecassandraHex, SiMysql, SiTypescript, SiTypescriptHex } from "@icons-pack/react-simple-icons";
import { ClassValue } from "clsx";
import Link from "next/link";
import { CSSProperties } from "react";
import { AnimatedDBCard, EventsCard, MailCard, TestsCard, UpdateFunctionsCard } from "./feature-cards";
import Image from "next/image";

const iconClassName: ClassValue = "scale-75 mr-1 rounded-sm"
const experienceData = [
	{
		logo: "/comcast_logo.png",
		title: "Software Engineer Intern",
		workplace: { name: "Comcast", url: "https://www.xfinity.com" },
		date: "April 2025 - Present",
		skills: [{ icon: <SiTypescript className={iconClassName} fill={SiTypescriptHex} />, name: "TypeScript" }, { icon: <SiApachecassandra className={iconClassName} fill={SiApachecassandraHex} />, name: "Cassandra" }, { icon: <SiAmazonwebservices className={iconClassName} />, name: "AWS" }],
		cards: [
			<AnimatedDBCard key={0} />,
			<div key={1} className="md:max-w-sm flex justify-center items-center p-2">
				+ more to come
			</div>
		]
	},
	{
		logo: "/logos/alumniq_logo.png",
		title: "Junior Software Engineer",
		workplace: { name: "AlumnIQ", url: "https://www.alumniq.com" },
		date: "April 2024 - Sep. 2024",
		skills: [{ icon: <Image src="/logos/coldfusion.png" alt="ColdFusion logo" width={25} height={25} className={iconClassName} />, name: "ColdFusion" }, { icon: <SiMysql className={iconClassName} />, name: "MySQL" }, { icon: <SiAmazonwebservices className={iconClassName} />, name: "AWS" }],
		cards: [
			<MailCard key={0} />,
			<EventsCard key={1} />,
			<UpdateFunctionsCard key={2} />,
			<TestsCard key={3} />
		]
	}
];

export default function ExperienceSection() {
	return (
		<div className="max-w-full w-full px-4 md:px-14 lg:max-w-4xl">
			<div className="mt-10 flex flex-col gap-10 md:gap-8 w-full">
				<div className="relative">
					<h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">Experience</h2>
					{experienceData.map((exp, index) => (
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
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
									{exp.cards.map((card, index) => (
										<>{card}</>
									))}
								</div>
							</div>

						</div>
					))}
				</div>
			</div>
		</div>
	)
}
