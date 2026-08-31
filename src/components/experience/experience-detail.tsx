"use client";

import { ExperienceSlug, getExperience, getSurroundingExperiences } from "@/lib/experience";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { CSSProperties } from "react";
import { Footer } from "../home/footer";
import { AnimatedGroup } from "../ui/animated-group";
import { featureCardsBySlug } from "./feature-cards-by-slug";
import { visualsBySlug } from "./visuals";

const shinyLinkClassName = cn(
	"text-primary/70",
	"hover:text-primary/100 dark:hover:text-primary/70 transition-all duration-200 ease-in-out",
	"dark:hover:animate-shiny-text dark:bg-clip-text dark:bg-no-repeat dark:bg-position-[0_0] dark:bg-size-[var(--shiny-width)_100%] dark:[transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
	"dark:hover:bg-linear-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80"
);

export function ExperienceDetail({ slug }: { slug: ExperienceSlug }) {
	const experience = getExperience(slug);
	if (!experience) return null;

	const Visual = visualsBySlug[slug];
	const cards = featureCardsBySlug[slug];
	const { earlier, moreRecent } = getSurroundingExperiences(slug);

	return (
		<main className="overflow-hidden">
			<div className="mx-auto max-w-full w-full px-4 md:px-14 lg:max-w-4xl pt-24 sm:pt-28 pb-10">
				<Link
					href="/#experience"
					className="inline-flex flex-row items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
				>
					<ArrowLeftIcon className="size-4" />
					Experience
				</Link>

				<motion.div
					className="mt-6 overflow-hidden rounded-2xl border border-border"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
				>
					{/*
					 * 16/7 is only ~157px tall at phone width, which clips the graphics.
					 * Small screens get the same taller ratio the home cards use.
					 */}
					<div className="relative aspect-[16/10] w-full md:aspect-[16/7]">
						<Visual active />
					</div>
				</motion.div>

				<div className="mt-8 flex flex-col gap-2">
					<h1 className="text-3xl lg:text-5xl font-semibold tracking-tight">{experience.title}</h1>
					<p className="text-lg">
						<Link
							href={experience.workplace.url}
							target="_blank"
							className={shinyLinkClassName}
							style={{ "--shiny-width": "75px" } as CSSProperties}
						>
							{experience.workplace.name}
						</Link>
						<span className="text-muted-foreground"> · {experience.date}</span>
					</p>
					<div className="mt-2 flex flex-row flex-wrap gap-2">
						{experience.skills.map(skill => (
							<span
								key={skill.name}
								className="inline-flex flex-row items-center rounded-full border border-border bg-background/70 py-1 pl-2 pr-3 text-xs text-muted-foreground"
							>
								{skill.icon}
								{skill.name}
							</span>
						))}
					</div>
				</div>

				<p className="mt-8 text-primary/80 leading-relaxed">{experience.text}</p>

				<h2 className="mb-4 mt-14 text-2xl font-semibold tracking-tight">Highlights</h2>
				<AnimatedGroup
					as="div"
					className="grid grid-cols-1 md:grid-cols-2 gap-4"
					preset="blur"
					viewport={{ amount: 0.1, once: true }}
				>
					{cards.map((Card, index) => (
						<Card key={index} />
					))}
				</AnimatedGroup>

				{/* Left is further back in time, right is more recent, so the pair reads as a timeline. */}
				<nav className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Other roles">
					{earlier && (
						<Link
							href={`/experience/${earlier.slug}`}
							className="group flex flex-col rounded-xl border border-border p-4 transition-colors duration-200 hover:bg-foreground/[0.03]"
						>
							<span className="flex flex-row items-center gap-1.5 text-xs text-muted-foreground">
								<ArrowLeftIcon className="size-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
								Before this
							</span>
							<span className="mt-1 text-sm font-medium">{earlier.title}</span>
							<span className="text-xs text-muted-foreground">
								{earlier.workplace.name} · {earlier.date}
							</span>
						</Link>
					)}
					{moreRecent && (
						<Link
							href={`/experience/${moreRecent.slug}`}
							className="group flex flex-col items-end rounded-xl border border-border p-4 text-right transition-colors duration-200 hover:bg-foreground/[0.03] sm:col-start-2"
						>
							<span className="flex flex-row items-center gap-1.5 text-xs text-muted-foreground">
								After this
								<ArrowRightIcon className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
							</span>
							<span className="mt-1 text-sm font-medium">{moreRecent.title}</span>
							<span className="text-xs text-muted-foreground">
								{moreRecent.workplace.name} · {moreRecent.date}
							</span>
						</Link>
					)}
				</nav>
			</div>

			<Footer />
		</main>
	);
}
