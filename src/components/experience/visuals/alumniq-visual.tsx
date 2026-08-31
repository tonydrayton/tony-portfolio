"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MailCheckIcon, MailOpenIcon, MailXIcon, ShieldAlertIcon, WebhookIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlayOnce } from "./use-play-once";
import { CompanyVisualProps, VisualFrame } from "./visual-frame";

const TRAVEL_SECONDS = 0.85;
const CYCLE_MS = 1750;
/** One pass through every lane, then the router holds its last route. */
const PLAY_MS = 7400;

/**
 * Real Mailgun webhook event types, which is what makes this read as a router
 * rather than decoration -- each event lands in a different lane, so no two
 * cycles look the same.
 */
const LANES = [
	{ type: "delivered", color: "#22c55e", y: 20, Icon: MailCheckIcon },
	{ type: "opened", color: "#0084fc", y: 37, Icon: MailOpenIcon },
	{ type: "bounced", color: "#e4b460", y: 54, Icon: MailXIcon },
	{ type: "complained", color: "#ef4444", y: 71, Icon: ShieldAlertIcon },
] as const;

const NODE_X = 33;
const INGRESS_Y = 45.5;

export function AlumnIQVisual({ active, className }: CompanyVisualProps) {
	const [tick, setTick] = useState(0);
	const phase = usePlayOnce(active, PLAY_MS);
	const isPlaying = phase === "playing";

	useEffect(() => {
		if (!isPlaying) return;
		const id = setInterval(() => setTick(current => current + 1), CYCLE_MS);
		return () => clearInterval(id);
	}, [isPlaying]);

	/* The lane the run finished on stays lit, so the settled frame still reads as a router. */
	const routed = LANES[tick % LANES.length];

	return (
		<VisualFrame
			accent={{ primary: "#0084fc", secondary: "#e4b460" }}
			logo="/logos/alumniq_logo.png"
			logoAlt="AlumnIQ logo"
			phase={phase}
			className={className}
			badge={
				<span className="flex flex-row items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 py-1 shadow-sm md:backdrop-blur-md">
					<WebhookIcon className="size-3 text-[#0084fc] dark:text-[#67b6ff]" />
					<span className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">mailgun events</span>
				</span>
			}
		>
			{/*
			 * viewBox is percentage space with non-uniform scaling so SVG
			 * coordinates line up with the percentage-positioned HTML on top,
			 * whatever aspect ratio the caller picks. Strokes opt out of the
			 * scaling so they stay an even hairline.
			 */}
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
				<path
					d={`M0 ${INGRESS_Y}H${NODE_X - 4}`}
					fill="none"
					strokeWidth={1}
					vectorEffect="non-scaling-stroke"
					className="stroke-foreground/20"
					strokeDasharray="3 3"
				/>
				{LANES.map(lane => {
					const isRouted = phase !== "idle" && lane.type === routed.type;
					return (
						<motion.path
							key={lane.type}
							d={`M${NODE_X + 4} ${INGRESS_Y}C${NODE_X + 16} ${INGRESS_Y} ${NODE_X + 14} ${lane.y} ${NODE_X + 26} ${lane.y}`}
							fill="none"
							strokeWidth={isRouted ? 1.5 : 1}
							vectorEffect="non-scaling-stroke"
							stroke={isRouted ? lane.color : "currentColor"}
							className={cn(!isRouted && "text-foreground/15")}
							animate={{ opacity: isRouted ? 1 : 0.55 }}
							transition={{ duration: 0.35, delay: isRouted ? TRAVEL_SECONDS : 0 }}
						/>
					);
				})}
			</svg>

			{isPlaying && (
				<motion.span
					key={tick}
					className="absolute size-1.5 rounded-full"
					style={{ top: `${INGRESS_Y}%`, backgroundColor: routed.color, translateY: "-50%" }}
					initial={{ left: "2%", opacity: 0 }}
					animate={{ left: `${NODE_X - 5}%`, opacity: [0, 1, 1, 0] }}
					transition={{ duration: TRAVEL_SECONDS, ease: "easeIn", times: [0, 0.15, 0.85, 1] }}
				/>
			)}

			<div
				className="absolute -translate-x-1/2 -translate-y-1/2"
				style={{ left: `${NODE_X}%`, top: `${INGRESS_Y}%` }}
			>
				<motion.span
					className="absolute -inset-1 rounded-xl border"
					style={{ borderColor: routed.color }}
					animate={isPlaying ? { opacity: [0, 0.8, 0], scale: [0.85, 1.2, 1.2] } : { opacity: 0, scale: 0.85 }}
					transition={isPlaying
						? { duration: 0.7, delay: TRAVEL_SECONDS, ease: "easeOut" }
						: { duration: 0.3 }}
				/>
				<div className="relative flex size-9 items-center justify-center rounded-lg border border-border/70 bg-background/90 shadow-sm md:backdrop-blur-sm">
					<WebhookIcon className="size-4 text-[#0084fc] dark:text-[#67b6ff]" />
				</div>
			</div>

			{LANES.map(lane => {
				const isRouted = phase !== "idle" && lane.type === routed.type;
				return (
					<motion.span
						className="absolute flex -translate-y-1/2 flex-row items-center gap-1.5 rounded-md border bg-background/85 px-2 py-1 md:backdrop-blur-sm"
						key={lane.type}
						style={{ left: `${NODE_X + 26}%`, top: `${lane.y}%` }}
						animate={{
							borderColor: isRouted ? lane.color : "hsl(var(--border))",
							opacity: isRouted ? 1 : 0.55,
						}}
						transition={{ duration: 0.3, delay: isRouted ? TRAVEL_SECONDS : 0 }}
					>
						<lane.Icon className="size-3 shrink-0" style={{ color: isRouted ? lane.color : undefined }} />
						<span className={cn("font-mono text-[9px]", isRouted ? "text-foreground" : "text-muted-foreground")}>
							{lane.type}
						</span>
					</motion.span>
				);
			})}
		</VisualFrame>
	);
}
