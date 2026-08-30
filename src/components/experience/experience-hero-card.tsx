"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Experience } from "@/lib/experience";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { visualsBySlug } from "./visuals";

type ExperienceHeroCardProps = {
	experience: Experience;
	/** Drives the visual's animation; owned by the grid so only one runs at a time. */
	active: boolean;
	/** True when a sibling card is the focused one. */
	dimmed: boolean;
	/** The full-width leading card needs a wider graphic or it towers over the pair below it. */
	aspectClassName?: string;
	onActivate: () => void;
	onDeactivate: () => void;
};

export function ExperienceHeroCard({
	experience,
	active,
	dimmed,
	aspectClassName = "aspect-[16/10]",
	onActivate,
	onDeactivate,
}: ExperienceHeroCardProps) {
	const Visual = visualsBySlug[experience.slug];

	return (
		<Link
			href={`/experience/${experience.slug}`}
			aria-label={`${experience.title} at ${experience.workplace.name}, ${experience.date}`}
			className={cn(
				"group block h-full rounded-2xl transition-all duration-300 ease-out",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
				dimmed && "md:scale-[0.985] md:opacity-60 md:blur-[1.5px]"
			)}
			onMouseEnter={onActivate}
			onMouseLeave={onDeactivate}
			onFocus={onActivate}
			onBlur={onDeactivate}
		>
			<GlowingEffect
				className="h-full rounded-2xl"
				from={experience.accent.primary}
				to={experience.accent.secondary}
				spread={300}
			>
				<article className="flex h-full flex-col">
					<div className={cn("relative w-full shrink-0", aspectClassName)}>
						<Visual active={active} />
					</div>
					<div className="flex flex-1 flex-col px-5 pb-5">
						<div className="flex flex-row items-start justify-between gap-3">
							<h3 className="text-lg font-medium tracking-tight">{experience.title}</h3>
							<ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
						</div>
						<p className="mt-0.5 text-sm text-muted-foreground">
							{experience.workplace.name} · {experience.date}
						</p>
						<p className="mt-2 text-sm text-balance text-primary/70">{experience.tagline}</p>
					</div>
				</article>
			</GlowingEffect>
		</Link>
	);
}
