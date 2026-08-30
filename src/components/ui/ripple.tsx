import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

interface RippleProps extends React.ComponentPropsWithoutRef<"div"> {
	mainCircleSize?: number;
	mainCircleOpacity?: number;
	numCircles?: number;
	/** Any CSS colour; drives the ring border and, when filled, its tint. */
	color?: string;
	/** Pauses the breathing animation so idle instances cost nothing. */
	animate?: boolean;
	/**
	 * Concentric translucent fills all overlap at the centre, so the middle of
	 * the stack is composited once per circle. Outline-only costs a fraction of
	 * that and reads the same when the rings sit over a gradient.
	 */
	fill?: boolean;
}

export function Ripple({
	mainCircleSize = 210,
	mainCircleOpacity = 0.24,
	numCircles = 8,
	color,
	animate = true,
	fill = true,
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
							"absolute left-1/2 top-1/2 rounded-full border [--i:0]",
							fill && "bg-foreground/10",
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
							background: fill && color ? `${color}14` : undefined,
							transform: "translate(-50%, -50%) scale(1)",
							["--i" as keyof CSSProperties]: i,
						} as CSSProperties}
					/>
				);
			})}
		</div>
	);
}
