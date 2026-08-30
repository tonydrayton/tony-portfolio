"use client";

import { useWindowSize } from "@/hooks";
import { Experience, experiences } from "@/lib/experience";
import { MinimumWidth } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExperienceHeroCard } from "../experience/experience-hero-card";

type ExperienceCardSlotProps = {
	experience: Experience;
	index: number;
	hovered: number | null;
	setHovered: (index: number | null) => void;
	isDesktop: boolean;
	className?: string;
	aspectClassName?: string;
};

function ExperienceCardSlot({
	experience,
	index,
	hovered,
	setHovered,
	isDesktop,
	className,
	aspectClassName,
}: ExperienceCardSlotProps) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { amount: 0.45 });

	/* Hover picks the live card on desktop; on touch the card in view wins. */
	const active = isDesktop ? hovered === index : inView;
	const dimmed = isDesktop && hovered !== null && hovered !== index;

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, filter: "blur(4px)", y: 16 }}
			whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
		>
			<ExperienceHeroCard
				experience={experience}
				active={active}
				dimmed={dimmed}
				aspectClassName={aspectClassName}
				onActivate={() => setHovered(index)}
				onDeactivate={() => setHovered(null)}
			/>
		</motion.div>
	);
}

export default function ExperienceSection() {
	const [hovered, setHovered] = useState<number | null>(null);
	const windowSize = useWindowSize();
	const isDesktop = windowSize.width >= MinimumWidth.Medium;

	return (
		<div className="max-w-full w-full px-4 md:px-14 lg:max-w-4xl">
			<div className="mt-10 flex flex-col gap-10 md:gap-8 w-full">
				<div className="relative">
					<h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">Experience</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{experiences.map((experience, index) => (
							<ExperienceCardSlot
								key={experience.slug}
								experience={experience}
								index={index}
								hovered={hovered}
								setHovered={setHovered}
								isDesktop={isDesktop}
								className={cn(index === 0 && "md:col-span-2")}
								aspectClassName={index === 0 ? "aspect-[16/10] md:aspect-[21/9]" : undefined}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
