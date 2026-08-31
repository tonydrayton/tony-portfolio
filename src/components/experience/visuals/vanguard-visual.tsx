"use client";

import { cn } from "@/lib/utils";
import { TrendingUpIcon } from "lucide-react";
import { useId } from "react";
import { usePlayOnce } from "./use-play-once";
import { CompanyVisualProps, VisualFrame } from "./visual-frame";

const ACCENT_TEXT = "text-[#96151d] dark:text-[#e2848c]";
const ACCENT_BORDER = "border-[#96151d]/45 dark:border-[#e2848c]/45";

const CHART_WIDTH = 200;
const CHART_HEIGHT = 58;
const PLAY_MS = 2600;

/**
 * Deterministic rather than random: a random series would differ between the
 * server and client render and trip hydration.
 */
const SERIES = Array.from({ length: 26 }, (_, i) => {
	const progress = i / 25;
	return 30 + progress * 24 + Math.sin(i * 1.3) * 4.6 + Math.sin(i * 0.47) * 3.1;
});

const { linePath, areaPath } = (() => {
	const pad = 5;
	const min = Math.min(...SERIES);
	const max = Math.max(...SERIES);
	const range = max - min || 1;

	const point = (value: number, index: number) => {
		const x = (index / (SERIES.length - 1)) * CHART_WIDTH;
		const y = CHART_HEIGHT - pad - ((value - min) / range) * (CHART_HEIGHT - pad * 2);
		return `${x.toFixed(1)} ${y.toFixed(1)}`;
	};

	const line = SERIES.map((value, index) => `${index === 0 ? "M" : "L"}${point(value, index)}`).join(" ");
	return {
		linePath: line,
		areaPath: `${line} L${CHART_WIDTH} ${CHART_HEIGHT} L0 ${CHART_HEIGHT} Z`,
	};
})();

/**
 * A quote panel: ticker, price, change, chart, buy. The vocabulary every finance
 * app shares, so it is recognisable at a glance rather than needing decoding.
 *
 * Earlier passes failed on legibility. A wave standing in for a price line and a
 * tape of tiny candlesticks both required the viewer to be told what they were
 * looking at, and an order-state rail was pure jargon. VTI is a real, public
 * Vanguard fund, which anchors the card to the company without touching anything
 * internal; the figures are illustrative.
 */
export function VanguardVisual({ active, className }: CompanyVisualProps) {
	const phase = usePlayOnce(active, PLAY_MS);
	const revealed = phase !== "idle";
	const settled = phase === "settled";
	const gradientId = `quote-${useId().replace(/:/g, "")}`;

	/* Settling collapses the stagger so a card scrolled past mid-run lands whole. */
	const delay = (ms: number) => ({ transitionDelay: `${settled ? 0 : ms}ms` });

	return (
		<VisualFrame
			accent={{ primary: "#96151d", secondary: "#16233d" }}
			mesh={{
				primary: "var(--mesh-vanguard-primary)",
				secondary: "var(--mesh-vanguard-secondary)",
			}}
			logo="/logos/vanguard_logo.png"
			logoAlt="Vanguard logo"
			phase={phase}
			className={className}
		>
			<div className="absolute inset-0 flex items-center justify-center px-4 pb-[11%]">
				<div className="w-full max-w-[19rem] rounded-xl border border-border bg-background/75 p-3 shadow-sm md:max-w-[23rem] md:p-4">
					<div className="flex flex-row items-center gap-2">
						<span className={cn("rounded-md border bg-background/80 px-1.5 py-0.5 font-mono text-[10px] font-medium", ACCENT_BORDER, ACCENT_TEXT)}>
							VTI
						</span>
						<span className="truncate text-[10px] text-muted-foreground">Total Stock Market ETF</span>
						<span
							className="ml-auto flex shrink-0 flex-row items-center gap-1 font-mono text-[10px] transition-opacity duration-500"
							style={{ ...delay(1400), opacity: revealed ? 1 : 0, color: `var(--quote-gain)` }}
						>
							<TrendingUpIcon className="size-3" />
							+1.24%
						</span>
					</div>

					<div
						className="mt-1.5 font-mono text-lg leading-none tabular-nums transition-opacity duration-500 md:text-xl"
						style={{ ...delay(1200), opacity: revealed ? 1 : 0 }}
					>
						$291.40
					</div>

					<svg
						viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
						preserveAspectRatio="none"
						className="mt-2 h-12 w-full md:h-14"
						aria-hidden="true"
					>
						<defs>
							<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="var(--quote-gain)" stopOpacity="0.28" />
								<stop offset="100%" stopColor="var(--quote-gain)" stopOpacity="0" />
							</linearGradient>
						</defs>
						<path
							d={areaPath}
							fill={`url(#${gradientId})`}
							className="transition-opacity duration-700"
							style={{ ...delay(700), opacity: revealed ? 1 : 0 }}
						/>
						<path
							d={linePath}
							fill="none"
							stroke="var(--quote-gain)"
							strokeWidth="1.75"
							strokeLinecap="round"
							strokeLinejoin="round"
							pathLength={1}
							strokeDasharray={1}
							className="transition-[stroke-dashoffset] duration-[1100ms] ease-out"
							style={{ strokeDashoffset: revealed ? 0 : 1, ...delay(0) }}
						/>
					</svg>

					<div className="mt-2 flex flex-row items-center gap-2">
						<span
							className={cn(
								"rounded-md border px-2.5 py-1 font-mono text-[10px] transition-colors duration-500",
								revealed ? cn(ACCENT_BORDER, ACCENT_TEXT) : "border-border text-muted-foreground"
							)}
							style={delay(1700)}
						>
							Buy
						</span>
						<span className="font-mono text-[9px] text-muted-foreground">market order</span>
					</div>
				</div>
			</div>
		</VisualFrame>
	);
}
