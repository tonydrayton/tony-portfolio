"use client";

import { Ripple } from "@/components/ui/ripple";
import { motion } from "framer-motion";
import { WifiIcon } from "lucide-react";
import { CompanyVisualProps, VisualFrame } from "./visual-frame";

const BROADCAST_DURATION = 3.2;

/** Delays are tuned to each dot's distance so it lights as a ring reaches it. */
const DEVICES = [
	{ x: 50, y: 14, delay: 0.7 },
	{ x: 22, y: 28, delay: 0.95 },
	{ x: 79, y: 33, delay: 1.05 },
	{ x: 15, y: 66, delay: 1.4 },
	{ x: 84, y: 70, delay: 1.25 },
];

const RING_DELAYS = [0, BROADCAST_DURATION / 3, (BROADCAST_DURATION / 3) * 2];

export function ComcastVisual({ active, className }: CompanyVisualProps) {
	return (
		<VisualFrame
			accent={{ primary: "#6060a8", secondary: "#0084cc" }}
			logo="/logos/comcast.png"
			logoAlt="Comcast logo"
			active={active}
			className={className}
		>
			<div className="absolute inset-0 -translate-y-[6%]">
				<Ripple
					animate={active}
					numCircles={5}
					mainCircleSize={110}
					mainCircleOpacity={0.14}
					color="#6060a8"
				/>

				<div className="absolute inset-0 flex items-center justify-center">
					{RING_DELAYS.map(delay => (
						<motion.span
							key={delay}
							className="absolute size-24 rounded-full border border-[#0084cc]/50"
							initial={{ scale: 0.35, opacity: 0 }}
							animate={active
								? { scale: [0.35, 2.1], opacity: [0.7, 0] }
								: { scale: 0.35, opacity: 0 }}
							transition={active
								? { duration: BROADCAST_DURATION, repeat: Infinity, ease: "easeOut", delay }
								: { duration: 0.3 }}
						/>
					))}

					<div className="relative flex size-9 items-center justify-center rounded-lg border border-border/70 bg-background/80 shadow-sm backdrop-blur-sm">
						<WifiIcon className="size-4 text-[#6060a8] dark:text-[#a7a7e2]" />
					</div>
				</div>

				{DEVICES.map(device => (
					<motion.span
						key={`${device.x}-${device.y}`}
						className="absolute size-1.5 rounded-full bg-foreground/30"
						style={{ left: `${device.x}%`, top: `${device.y}%` }}
						animate={active
							? {
								scale: [1, 1.8, 1],
								opacity: [0.35, 1, 0.35],
								boxShadow: [
									"0 0 0 0px rgba(0,132,204,0)",
									"0 0 0 4px rgba(0,132,204,0.35)",
									"0 0 0 8px rgba(0,132,204,0)",
								],
							}
							: { scale: 1, opacity: 0.35 }}
						transition={active
							? {
								duration: BROADCAST_DURATION,
								repeat: Infinity,
								ease: "easeOut",
								delay: device.delay,
								times: [0, 0.15, 1],
							}
							: { duration: 0.3 }}
					/>
				))}
			</div>
		</VisualFrame>
	);
}
