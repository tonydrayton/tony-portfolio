import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

interface RippleProps extends React.ComponentPropsWithoutRef<"div"> {
	mainCircleSize?: number;
	mainCircleOpacity?: number;
	numCircles?: number;
	/** Any CSS colour; drives both the ring border and its fill. */
	color?: string;
	/** Pauses the breathing animation so idle instances cost nothing. */
	animate?: boolean;
}

export function Ripple({
	mainCircleSize = 210,
	mainCircleOpacity = 0.24,
	numCircles = 8,
	color,
	animate = true,
	className,
	...props
}: RippleProps) {
	return (
		<div
			aria-hidden="true"
			className={cn("pointer-events-none absolute inset-0 select-none", className)}
			{...props}
		>
			{Array.from({ length: numCircles }, (_, i) => {
				const size = mainCircleSize + i * 70;
				const opacity = Math.max(mainCircleOpacity - i * 0.03, 0);
				const borderStyle = i === numCircles - 1 ? "dashed" : "solid";

				return (
					<div
						key={i}
						className={cn(
							"absolute left-1/2 top-1/2 rounded-full border bg-foreground/10 [--i:0]",
							animate && "animate-ripple"
						)}
						style={{
							width: `${size}px`,
							height: `${size}px`,
							opacity,
							animationDelay: `${i * 0.06}s`,
							borderStyle,
							borderWidth: "1px",
							borderColor: color ?? `hsl(var(--foreground) / ${0.15 + i * 0.02})`,
							background: color ? `${color}14` : undefined,
							transform: "translate(-50%, -50%) scale(1)",
							["--i" as keyof CSSProperties]: i,
						} as CSSProperties}
					/>
				);
			})}
		</div>
	);
}
