import { SiAmazonwebservices, SiAngular, SiApachecassandra, SiApachecassandraHex, SiMysql, SiOpenid, SiTypescript, SiTypescriptHex } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import { ReactNode } from "react";

const iconClassName = "scale-75 mr-1 rounded-sm";

export type ExperienceSlug = "vanguard" | "comcast" | "alumniq";

export type ExperienceSkill = {
	icon?: ReactNode;
	name: string;
};

export type Experience = {
	slug: ExperienceSlug;
	logo: string;
	logoAlt: string;
	title: string;
	workplace: { name: string; url: string };
	date: string;
	/** One line under the card title on the home grid. */
	tagline: string;
	/** Long-form bio, shown in full on the detail page. */
	text: string;
	skills: ExperienceSkill[];
	/** Both tones sampled from the company's own mark. */
	accent: { primary: string; secondary: string };
};

export const experiences: Experience[] = [
	{
		slug: "vanguard",
		logo: "/logos/vanguard_logo.png",
		logoAlt: "Vanguard logo",
		title: "Application Engineer",
		workplace: { name: "Vanguard", url: "https://www.vanguard.com" },
		date: "March 2026 - Present",
		tagline: "Micro-frontends on a trading platform where real money moves",
		text: "My first time on a trading platform, and the first time my code sat somewhere real money moves, which made me a lot more careful than I'd been anywhere else. The front end was split into a bunch of small apps that all release on their own, so a change that looked like one line in one repo usually meant getting teams I'd never met to ship in the right order. Those were the tickets nobody really owned, and I kept picking them up anyway. The habit I took away from this one is writing the analysis before the code. I'd spend a day on a doc explaining what was actually broken, and the fix almost always came out smaller than if I had just started typing. The tickets I liked best ended with less code than they started with. I also did a lot of accessibility work alongside the team that files those defects, which changed how I build anything now. Six months and 60+ tickets later, I'm still surprised by how much of the job was talking to people.",
		skills: [
			{ icon: <SiAngular className={iconClassName} />, name: "Angular" },
			{ icon: <SiTypescript className={iconClassName} fill={SiTypescriptHex} />, name: "TypeScript" },
			{ icon: <SiOpenid className={iconClassName} />, name: "OAuth" },
		],
		accent: { primary: "#96151d", secondary: "#16233d" },
	},
	{
		slug: "comcast",
		logo: "/logos/comcast.png",
		logoAlt: "Comcast logo",
		title: "Software Engineer Co-op",
		workplace: { name: "Comcast", url: "https://www.xfinity.com" },
		date: "April 2025 - Sep. 2025",
		tagline: "Internal tooling for the gateways sitting in customers' homes",
		text: "My step into the corporate world, which I've always romanticized from watching countless television shows. The first day was my orientation at the office in Center City (my location was the New Jersey office), and it was truly an adventure. In the coming days, I began to settle in with my new team. Sadly, there were no other interns at my office, but that didn't stop me from making friends with other teams. My workload consisted mostly of Python projects and scripts. Midway through my time there, I was assigned to a group with other interns from different locations, where we had a new project to work on. We were tasked with creating a pitch presentation detailing a new idea or feature for Comcast. Throughout the project, I had frequent meetings with the other interns where we worked on our pitch. Ultimately, we all went to the headquarters to present our project to other Comcast employees and officials. It was an enjoyable experience working for Comcast, and even though they have over 10,000 employees, you can tell they care about each one.",
		skills: [
			{ icon: <SiTypescript className={iconClassName} fill={SiTypescriptHex} />, name: "TypeScript" },
			{ icon: <SiApachecassandra className={iconClassName} fill={SiApachecassandraHex} />, name: "Cassandra" },
			{ icon: <SiAmazonwebservices className={iconClassName} />, name: "AWS" },
		],
		accent: { primary: "#6060a8", secondary: "#0084cc" },
	},
	{
		slug: "alumniq",
		logo: "/logos/alumniq_logo.png",
		logoAlt: "AlumnIQ logo",
		title: "Junior Software Engineer",
		workplace: { name: "AlumnIQ", url: "https://www.alumniq.com" },
		date: "April 2024 - Sep. 2024",
		tagline: "Transactional mail and platform work for alumni events",
		text: "My very first \"official\" job as a Software Engineer. I hate to admit it, but I was extremely nervous about taking on the position. I had seen the \"day-in-the-life\" videos of others with the same title, but I had no idea what the job actually entailed. The start was rocky, though I eventually settled in. In May of 2024, I finally met my team in person at a Drexel Reunion event, where we were serving as support staff. Seeing them all after months of online meetings made me feel much more connected to everyone. In the end, I loved my job and all of my coworkers there. I'm glad it was my first experience in the field, and I wouldn't replace it with anything. Thanks, Adam.",
		skills: [
			{ icon: <Image src="/logos/coldfusion.png" alt="ColdFusion logo" width={25} height={25} className={iconClassName} />, name: "ColdFusion" },
			{ icon: <SiTypescript className={iconClassName} fill={SiTypescriptHex} />, name: "TypeScript" },
			{ icon: <SiMysql className={iconClassName} />, name: "MySQL" },
			{ icon: <SiAmazonwebservices className={iconClassName} />, name: "AWS" },
		],
		accent: { primary: "#0084fc", secondary: "#e4b460" },
	},
];

export function getExperience(slug: string): Experience | undefined {
	return experiences.find(experience => experience.slug === slug);
}

/**
 * Named by time rather than list position: `experiences` is ordered
 * newest-first, so the *next* entry in the array is the *earlier* job. No
 * wrap-around, since looping past the oldest role back to the newest is what
 * made the old prev/next labels read backwards.
 */
export function getSurroundingExperiences(slug: string) {
	const index = experiences.findIndex(experience => experience.slug === slug);
	if (index === -1) return { earlier: undefined, moreRecent: undefined };

	return {
		earlier: experiences[index + 1],
		moreRecent: index > 0 ? experiences[index - 1] : undefined,
	};
}
