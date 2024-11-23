import Marquee from "react-fast-marquee";
import { SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs, SiFlask, SiTailwindcss, SiNodedotjs, SiC, SiAwslambda, SiDocker, SiJquery, SiMongodb, SiRedis } from '@icons-pack/react-simple-icons';


export default function TechStack() {
	return (
		<div className="flex flex-col gap-2 max-w-96">
			<Marquee pauseOnHover className="gap-2">
				<SiJavascript className="size-10" />JavaScript
				<SiTypescript className="size-10" />
				<SiPython className="size-10" />
				<SiReact className="size-10" />
				<SiNextdotjs className="size-10" />
				<SiTailwindcss className="size-10" />
				<SiNodedotjs className="size-10" />
			</Marquee>
			<Marquee autoFill >
				<SiFlask className="size-10" />
				<SiC className="size-10" />
				<SiAwslambda className="size-10" />
				<SiDocker className="size-10" />
				<SiJquery className="size-10" />
				<SiMongodb className="size-10" />
				<SiRedis className="size-10" />
			</Marquee>
		</div>
	)
}
