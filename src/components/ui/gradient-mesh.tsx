"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export type MeshBlob = {
	color: string;
	/** Blob diameter as a percentage of the container's smaller axis. */
	size?: number;
	/** Start and end positions as [x%, y%]; the blob drifts between them. */
	from: [number, number];
	to: [number, number];
	duration?: number;
	delay?: number;
};

const GRAIN_URI =
	"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/**
 * Layered drifting radial gradients behind a card's demo area.
 *
 * `animate` should be driven by the card's hover/in-view state so the drift only
 * runs while the card is actually being looked at -- several of these on one page
 * with always-on animation is a real amount of compositing work on low-end mobile.
 */
const FADE_MASKS: Record<string, string> = {
	/* Blobs ramp in from the top so there is no visible seam where they begin. */
	top: "linear-gradient(to bottom, transparent 0%, #000 55%)",
	bottom: "linear-gradient(to top, transparent 0%, #000 55%)",
	edges: "radial-gradient(120% 120% at 50% 65%, #000 35%, transparent 78%)",
	none: "",
};

export function GradientMesh({
	blobs,
	className,
	base,
	grain = true,
	animate = true,
	fade = "top",
}: {
	blobs: MeshBlob[];
	className?: string;
	/** Flat colour painted under the blobs, mirroring the tinted-placeholder trick. */
	base?: string;
	grain?: boolean;
	animate?: boolean;
	/**
	 * Without a mask the blurred blobs read as a distinct rectangular panel sitting
	 * on top of the card. Masking ramps them out so they blend into whatever is behind.
	 */
	fade?: "top" | "bottom" | "edges" | "none";
}) {
	const resolved = useMemo(
		() =>
			blobs.map((blob, i) => ({
				size: 90,
				duration: 12 + i * 2,
				delay: i * 0.6,
				...blob,
			})),
		[blobs]
	);

	const mask = FADE_MASKS[fade];
	const prefersReducedMotion = useReducedMotion();
	const isAnimating = animate && !prefersReducedMotion;

	return (
		<div
			aria-hidden="true"
			className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
			style={{
				...(base ? { backgroundColor: base } : {}),
				...(mask ? { maskImage: mask, WebkitMaskImage: mask } : {}),
			}}
		>
			{resolved.map((blob, i) => {
				/*
				 * Drift is expressed as a transform on an inner element rather than
				 * animated `left`/`top`. Animating layout properties on a blurred
				 * element re-runs layout and re-blurs a large surface every frame,
				 * which is what made several of these at once unusable on mobile.
				 * Transforms let the compositor reuse the cached blurred texture.
				 *
				 * The offsets are percentages of the blob rather than of the
				 * container, so the drift distance differs slightly from a
				 * position-based version. For abstract decoration that is fine.
				 */
				const drift = isAnimating
					? {
						x: ["0%", `${blob.to[0] - blob.from[0]}%`, "0%"],
						y: ["0%", `${blob.to[1] - blob.from[1]}%`, "0%"],
						scale: [1, 1.12, 1],
					}
					: undefined;

				return (
					<div
						key={i}
						className="absolute"
						style={{
							width: `${blob.size}%`,
							aspectRatio: "1",
							left: `${blob.from[0]}%`,
							top: `${blob.from[1]}%`,
							transform: "translate(-50%, -50%)",
						}}
					>
						<motion.div
							className="h-full w-full rounded-full blur-2xl"
							style={{
								background: `radial-gradient(circle at center, ${blob.color} 0%, transparent 68%)`,
								willChange: isAnimating ? "transform" : undefined,
							}}
							animate={drift}
							transition={{
								duration: blob.duration,
								delay: blob.delay,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					</div>
				);
			})}
			{grain && (
				<div
					className="absolute inset-0 opacity-[0.18] mix-blend-overlay dark:opacity-[0.12]"
					style={{ backgroundImage: GRAIN_URI }}
				/>
			)}
		</div>
	);
}

/**
 * 16/9 framed media well, following the reference site's recipe: square corners,
 * hairline border, and a tint painted underneath so there is never a bright flash
 * before the contents paint.
 */
export function MediaFrame({
	children,
	className,
	tint,
}: {
	children: React.ReactNode;
	className?: string;
	tint?: string;
}) {
	return (
		<div
			className={cn(
				"relative w-full overflow-hidden border border-foreground/10 box-border",
				"transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
				className
			)}
			style={tint ? { backgroundColor: tint } : undefined}
		>
			{children}
		</div>
	);
}
