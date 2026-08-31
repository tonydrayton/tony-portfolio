"use client";

import { Ripple } from "@/components/ui/ripple";
import { useIsMediumUp } from "@/hooks";
import { motion } from "framer-motion";
import { WifiIcon } from "lucide-react";
import { usePlayOnce } from "./use-play-once";
import { CompanyVisualProps, VisualFrame } from "./visual-frame";

const BROADCAST_DURATION = 3.2;
const PLAY_MS = 5400;

/** Delays are tuned to each dot's distance so it lights as a ring reaches it. */
const DEVICES = [
	{ x: 50, y: 14, delay: 0.7 },
	{ x: 22, y: 28, delay: 0.95 },
	{ x: 79, y: 33, delay: 1.05 },
	{ x: 15, y: 66, delay: 1.4 },
	{ x: 84, y: 70, delay: 1.25 },
];

const RING_DELAYS = [0, BROADCAST_DURATION / 2];

export function ComcastVisual({ active, className }: CompanyVisualProps) {
	/*
	 * Small screens get a single pulse ring and no static field. Every ring is
	 * another large composited surface over the gradient mesh, and phones were
	 * still dropping frames with the reduced set.
	 */
	const isMediumUp = useIsMediumUp() === true;
	const ringDelays = isMediumUp ? RING_DELAYS : RING_DELAYS.slice(0, 1);
	const phase = usePlayOnce(active, PLAY_MS);
	const isPlaying = phase === "playing";
	const hasRun = phase === "settled";

	return (
		<VisualFrame
			accent={{ primary: "#6060a8", secondary: "#0084cc" }}
			logo="/logos/comcast.png"
			logoAlt="Comcast logo"
			phase={phase}
			className={className}
		>
			<div className="absolute inset-0 -translate-y-[6%]">
				{/*
				 * The dish rings are the static field, not part of the motion. Having
				 * them breathe as well meant extra infinite animations under the
				 * pulses that actually carry the idea, and their overlapping fills
				 * made the centre of the card the most overdrawn region on the page.
				 */}
				{isMediumUp && (
					<Ripple
						animate={false}
						fill={false}
						numCircles={3}
						mainCircleSize={110}
						mainCircleOpacity={0.2}
						color="#6060a8"
					/>
				)}

				<div className="absolute inset-0 flex items-center justify-center">
					{ringDelays.map(delay => (
						<motion.span
							key={delay}
							className="absolute size-24 rounded-full border border-[#0084cc]/50"
							initial={{ scale: 0.35, opacity: 0 }}
							animate={isPlaying
								? { scale: [0.35, 2.1], opacity: [0.7, 0] }
								: { scale: 0.35, opacity: 0 }}
							transition={isPlaying
								? { duration: BROADCAST_DURATION, repeat: Infinity, ease: "easeOut", delay }
								: { duration: 0.3 }}
						/>
					))}

					<div className="relative flex size-9 items-center justify-center rounded-lg border border-border/90 bg-background/90 shadow-sm md:backdrop-blur-sm">
						<WifiIcon className="size-4 text-[#6060a8] dark:text-[#a7a7e2]" />
					</div>
				</div>

				{/* Settles lit rather than dim, so the final frame reads as connected. */}
				{DEVICES.map(device => (
					<motion.span
						key={`${device.x}-${device.y}`}
						className="absolute size-1.5 rounded-full bg-foreground/30"
						style={{ left: `${device.x}%`, top: `${device.y}%` }}
						animate={isPlaying
							? { scale: [1, 2.1, 1], opacity: [0.35, 1, 0.35] }
							: hasRun
								? { scale: 1.25, opacity: 0.85 }
								: { scale: 1, opacity: 0.35 }}
						transition={isPlaying
							? {
								duration: BROADCAST_DURATION,
								repeat: Infinity,
								ease: "easeOut",
								delay: device.delay,
								times: [0, 0.15, 1],
							}
							: { duration: 0.5, ease: "easeOut" }}
					/>
				))}
			</div>
		</VisualFrame>
	);
}
