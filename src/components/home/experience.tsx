"use client";

import { useHasFinePointer } from "@/hooks";
import { experiences } from "@/lib/experience";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExperienceHeroCard } from "../experience/experience-hero-card";

export default function ExperienceSection() {
	const [hovered, setHovered] = useState<number | null>(null);
	const [mostVisible, setMostVisible] = useState<number | null>(null);
	const hasFinePointer = useHasFinePointer();
	const prefersReducedMotion = useReducedMotion();
	const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

	/*
	 * Touch has no hover to nominate a card, so the one filling most of the
	 * viewport wins. One shared observer picking a single winner, rather than one
	 * per card each activating independently, is what keeps the page from running
	 * three canvas-and-blur visuals at the same time.
	 */
	useEffect(() => {
		if (hasFinePointer !== false) return;

		const ratios = new Map<number, number>();
		const observer = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					const index = Number((entry.target as HTMLElement).dataset.index);
					ratios.set(index, entry.intersectionRatio);
				}

				let winner: number | null = null;
				let bestRatio = 0.2;
				ratios.forEach((ratio, index) => {
					if (ratio > bestRatio) {
						bestRatio = ratio;
						winner = index;
					}
				});
				setMostVisible(winner);
			},
			{ threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
		);

		for (const slot of slotRefs.current) {
			if (slot) observer.observe(slot);
		}
		return () => observer.disconnect();
	}, [hasFinePointer]);

	/* Nothing animates until the pointer type is known. */
	const activeIndex = hasFinePointer === null ? null : hasFinePointer ? hovered : mostVisible;

	return (
		<div className="max-w-full w-full px-4 md:px-14 lg:max-w-4xl">
			<div className="mt-10 flex flex-col gap-10 md:gap-8 w-full">
				<div className="relative">
					<h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">Experience</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{experiences.map((experience, index) => (
							<motion.div
								key={experience.slug}
								ref={slot => {
									slotRefs.current[index] = slot;
								}}
								data-index={index}
								className={cn(index === 0 && "md:col-span-2")}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.15 }}
								transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
							>
								<ExperienceHeroCard
									experience={experience}
									active={!prefersReducedMotion && activeIndex === index}
									dimmed={hasFinePointer === true && hovered !== null && hovered !== index}
									aspectClassName={index === 0 ? "aspect-[16/10] md:aspect-[21/9]" : undefined}
									onActivate={() => setHovered(index)}
									onDeactivate={() => setHovered(null)}
								/>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
