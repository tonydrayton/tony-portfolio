"use client";

import { GradientMesh } from "@/components/ui/gradient-mesh";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Experience } from "@/lib/experience";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
import { VisualPhase } from "./use-play-once";

export type CompanyVisualProps = {
	/**
	 * Permission to play, owned by the parent grid so cards start one at a time.
	 * Each visual latches this into a play-once phase of its own.
	 */
	active: boolean;
	className?: string;
};

type VisualFrameProps = {
	phase: VisualPhase;
	accent: Experience["accent"];
	/**
	 * Full CSS colours for the two mesh blobs, alpha included. Lets a card hand
	 * over theme-aware custom properties instead of the flat hex derived from
	 * `accent`, which cannot vary between light and dark.
	 */
	mesh?: { primary: string; secondary: string };
	logo: string;
	logoAlt: string;
	/** Optional pill rendered in the same bottom-left row as the logo. */
	badge?: ReactNode;
	children?: ReactNode;
	className?: string;
};

/**
 * Shared bed for the three company visuals: brand-tinted mesh, chart grid, a
 * scrim so the graphic melts into the card body instead of ending on a hard
 * edge, and the logo pill in a consistent corner. The caller owns the aspect
 * ratio, since the home card and the detail hero use different proportions.
 */
export function VisualFrame({ accent, mesh, logo, logoAlt, badge, phase, children, className }: VisualFrameProps) {
	const meshPrimary = mesh?.primary ?? `${accent.primary}66`;
	const meshSecondary = mesh?.secondary ?? `${accent.secondary}52`;

	return (
		<div className={cn("relative h-full w-full overflow-hidden", className)}>
			<div className="absolute inset-0" style={{ backgroundColor: `${accent.primary}0f` }} />
			<GradientMesh
				animate={phase === "playing"}
				fade="none"
				blobs={[
					{ color: meshPrimary, size: 85, from: [18, 24], to: [54, 56], duration: 17 },
					{ color: meshSecondary, size: 72, from: [86, 76], to: [58, 40], duration: 21 },
				]}
			/>
			<GridPattern
				width={28}
				height={28}
				x="-1"
				y="-1"
				className="absolute inset-0 h-full w-full fill-foreground/[0.02] stroke-foreground/[0.06]"
			/>
			{children}
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/50 to-transparent" />
			<div className="absolute bottom-3 left-3 flex flex-row items-center gap-2">
				{/* rounded-full on the image so full-bleed marks read as circles too */}
				{/* backdrop-filter is disproportionately costly on mobile GPUs, so it is desktop-only */}
				<div className="flex items-center rounded-full border border-border/60 bg-background/80 p-1.5 shadow-sm md:backdrop-blur-md">
					<Image src={logo} alt={logoAlt} width={32} height={32} className="size-4 rounded-full object-contain" />
				</div>
				{badge}
			</div>
		</div>
	);
}
