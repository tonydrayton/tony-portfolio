"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useId, useMemo } from "react";
import { CompanyVisualProps, VisualFrame } from "./visual-frame";

const VIEW_WIDTH = 480;
const VIEW_HEIGHT = 200;
/** Waves are drawn past the frame so translating one wavelength loops seamlessly. */
const DRAW_WIDTH = 960;
const WAVELENGTH = 240;
const WATERLINE = 116;
const SWELL_DURATION = 9;

const WAVES = [
	{ baseline: WATERLINE, amplitude: 10, duration: SWELL_DURATION, className: "text-[#96151d] dark:text-[#e2606c]", strokeWidth: 1.75 },
	{ baseline: 140, amplitude: 8, duration: 13, className: "text-foreground/25", strokeWidth: 1.25 },
	{ baseline: 164, amplitude: 6, duration: 17, className: "text-foreground/15", strokeWidth: 1 },
];

/**
 * Gains rising off the water, which is the other half of what Vanguard is known
 * for. Values are decorative rather than any real quote.
 */
const FLOATERS = [
	{ label: "+1.24%", x: 12, size: "text-[10px]", delay: 0 },
	{ label: "$", x: 25, size: "text-[15px]", delay: 2.6 },
	{ label: "▲ 2.05", x: 58, size: "text-[10px]", delay: 1.3 },
	{ label: "$", x: 72, size: "text-[13px]", delay: 4.1 },
	{ label: "+0.86%", x: 84, size: "text-[10px]", delay: 0.7 },
];

const FLOAT_DURATION = 7;

const buildWavePath = (baseline: number, amplitude: number) => {
	const points: string[] = [];
	for (let x = 0; x <= DRAW_WIDTH; x += 8) {
		const y = baseline + Math.sin((x / WAVELENGTH) * Math.PI * 2) * amplitude;
		points.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
	}
	return points.join(" ");
};

/**
 * Vanguard is named for HMS Vanguard, so the market data and the sea are drawn
 * as the same object: the top swell is styled as a price line, the flickering
 * grid is the data field above the waterline, and the ship rides the boundary.
 */
export function VanguardVisual({ active, className }: CompanyVisualProps) {
	const rawId = useId();
	const swellId = `swell-${rawId.replace(/:/g, "")}`;

	const waves = useMemo(
		() => WAVES.map(wave => ({ ...wave, path: buildWavePath(wave.baseline, wave.amplitude) })),
		[]
	);

	return (
		<VisualFrame
			accent={{ primary: "#96151d", secondary: "#16233d" }}
			logo="/logos/vanguard_logo.png"
			logoAlt="Vanguard logo"
			active={active}
			className={className}
		>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-[58%] [mask-image:linear-gradient(to_bottom,#000_30%,transparent_100%)]">
				<FlickeringGrid
					animate={active}
					squareSize={2.5}
					gridGap={8}
					flickerChance={0.12}
					maxOpacity={0.3}
					color="#96151d"
				/>
			</div>

			{/* Rise is a transform, not an animated `top`, so it never triggers layout. */}
			{FLOATERS.map(floater => (
				<motion.span
					key={`${floater.label}-${floater.x}`}
					className={cn(
						"pointer-events-none absolute top-[52%] font-mono tabular-nums text-[#96151d] dark:text-[#e2606c]",
						floater.size
					)}
					style={{ left: `${floater.x}%` }}
					initial={{ y: 0, opacity: 0 }}
					animate={active
						? { y: [0, -26, -66, -88], opacity: [0, 0.8, 0.8, 0] }
						: { y: 0, opacity: 0 }}
					transition={active
						? {
							duration: FLOAT_DURATION,
							repeat: Infinity,
							delay: floater.delay,
							ease: "linear",
							times: [0, 0.15, 0.7, 1],
						}
						: { duration: 0.4 }}
				>
					{floater.label}
				</motion.span>
			))}

			<svg
				viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
				preserveAspectRatio="none"
				className="absolute inset-0 h-full w-full"
				aria-hidden="true"
			>
				<defs>
					<linearGradient id={swellId} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#96151d" stopOpacity="0.38" />
						<stop offset="100%" stopColor="#96151d" stopOpacity="0" />
					</linearGradient>
				</defs>

				{waves.map((wave, index) => (
					<motion.g
						key={index}
						className={wave.className}
						animate={active ? { x: [0, -WAVELENGTH] } : { x: 0 }}
						transition={active
							? { duration: wave.duration, repeat: Infinity, ease: "linear" }
							: { duration: 0.4 }}
					>
						{index === 0 && (
							<>
								<path d={`${wave.path} L${DRAW_WIDTH} ${VIEW_HEIGHT} L0 ${VIEW_HEIGHT} Z`} fill={`url(#${swellId})`} />
								<path
									d={wave.path}
									fill="none"
									stroke="currentColor"
									strokeWidth={4}
									opacity={0.25}
									style={{ filter: "blur(3px)" }}
								/>
							</>
						)}
						<path
							d={wave.path}
							fill="none"
							stroke="currentColor"
							strokeWidth={wave.strokeWidth}
							strokeLinecap="round"
						/>
					</motion.g>
				))}
			</svg>

			<div className="pointer-events-none absolute left-[44%] top-[58%] -translate-y-full">
				<motion.div
					className="relative"
					animate={active
						? { y: [-1, -11, -1, 9, -1], rotate: [-4, 0, 4, 0, -4] }
						: { y: -1, rotate: -4 }}
					transition={active
						? { duration: SWELL_DURATION, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }
						: { duration: 0.4 }}
				>
					<div className="absolute right-full top-[32px] h-px w-10 bg-gradient-to-l from-foreground/25 to-transparent" />
					<svg width="46" height="40" viewBox="0 0 46 40" fill="none" className="text-foreground/85" aria-hidden="true">
						{/* Main sail is cut at the same angle as the V in the logo. */}
						<path d="M24 3L39 28H24Z" fill="currentColor" />
						<path d="M21 8L10 28H21Z" fill="currentColor" opacity="0.7" />
						<rect x="21.4" y="1.5" width="1.6" height="27" fill="currentColor" />
						<path d="M4 29H42L37 37Q23 39 8.5 37Z" fill="currentColor" />
					</svg>
				</motion.div>
			</div>
		</VisualFrame>
	);
}
