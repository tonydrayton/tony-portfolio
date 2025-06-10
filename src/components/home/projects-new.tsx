import { Badge } from "@/components/ui/badge";
import { SiFlask, SiNextdotjs, SiPayloadcms, SiTrpc, SiTypescript } from "@icons-pack/react-simple-icons"
import { Github } from "lucide-react";
import Image from "next/image";

const iconClassName = "size-3 mr-1";
const projects = [
	{
		name: 'DragonGPT',
		type: 'Website',
		role: 'Frontend Developer',
		skills: [{ icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }],
		date: 'October 2024 - March 2025',
		description: 'Dedicated to finding loving homes for children in need through the power of AI',
		image: '/adopteam/home.png',
		link: {
			url: 'https://github.com/kxllydo/codefest24-25',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		},
		footer: 'Drexel 2024 Codefest Project'
	},
	{
		name: 'Adopteam',
		type: 'Website',
		role: 'Frontend Developer',
		skills: [{ icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { icon: <SiFlask className={iconClassName} />, name: "Flask" }],
		date: 'April 2024',
		description: 'Dedicated to finding loving homes for children in need through the power of AI',
		image: '/adopteam/home.png',
		link: {
			url: 'https://github.com/kxllydo/codefest24-25',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		},
		footer: 'Drexel 2024 Codefest Project'
	},
	{
		name: 'Digital Icon Market',
		type: 'Website',
		role: 'Fullstack Developer',
		skills: [{ icon: <SiPayloadcms className={iconClassName} />, name: "Payload CMS" }, { icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { icon: <SiTrpc className={iconClassName} />, name: "TRPC" }],
		date: 'December 2023',
		description: 'A lightweight icon market for users to buy and sell digital icons',
		image: '/digitaliconmarket/homepage.png',
		link: {
			url: 'https://github.com/tonydrayton/digitalmarket',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		}
	},
	{
		name: 'Vaeleth',
		type: 'Discord Bot',
		role: 'Main Developer',
		skills: [{ icon: <SiPayloadcms className={iconClassName} />, name: "Payload CMS" }, { icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { icon: <SiTrpc className={iconClassName} />, name: "TRPC" }],
		date: 'February 2019 - January 2022',
		description: 'A multipurpose Discord bot built to enhance your Discord experience. At its peak, it was in over 300 servers with over 500,000 users total.',
		image: '/vaeleth.png',
		link: {
			url: 'https://top.gg/bot/543565592527896596',
			text: 'View on Github',
			icon: <Github className='scale-75' />
		}
	}
]

export default function Projects() {
	return (
		<div>
			<div className="max-w-full w-full px-4 md:px-14 lg:max-w-4xl">
				<div className="mt-10 flex flex-col gap-10 md:gap-8 w-full">
					<h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">projects</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{projects.map((project, index) => (
						<div key={index} className="p-4 border border-border rounded-lg shadow-sm">
							<a href={project.link.url} target="_blank" rel="noopener noreferrer" className="block mb-2">
								<Image
									src={project.image}
									alt={`${project.name} screenshot`}
									width={200}
									height={100}
									className="w-full max-h-[172px] rounded-sm bg-transparent object-center object-contain"
								/>
							</a>
							<div className="mt-2 flex flex-row gap-1 items-center">
								<p className="font-semibold">{project.name}</p>
								<div className="mx-1 h-[1.1rem] w-[1px] bg-muted-foreground" />
								<span className="text-muted-foreground">{project.type}</span>
							</div>
							<div className="mt-1 text-xs text-muted-foreground">
								{project.date}
							</div>
							<div className="mt-2 text-sm text-primary/90">
								{project.description}
							</div>
						</div>
					))}
					</div>
				</div>
			</div>
		</div>
	)
}
