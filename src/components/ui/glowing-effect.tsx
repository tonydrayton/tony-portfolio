"use client";

import { useHasFinePointer } from "@/hooks";
import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode, useEffect, useRef } from "react";

type GlowingEffectProps = {
	children: ReactNode;
	className?: string;
	/** Extra px around the element where the pointer still drives the glow. */
	proximity?: number;
	/** Radius of the glow in px. */
	spread?: number;
	borderWidth?: number;
	from?: string;
	to?: string;
	disabled?: boolean;
};

/**
 * Pointer-tracking border glow in the spirit of Cursor's enterprise page.
 *
 * The gradient sits behind an opaque body inset by `borderWidth`, so it is only
 * visible as a hairline ring -- no mask compositing needed. Position is written
 * to CSS custom properties rather than React state, so tracking the pointer
 * costs no re-renders.
 */
export function GlowingEffect({
	children,
	className,
	proximity = 100,
	spread = 280,
	borderWidth = 1,
	from = "hsl(var(--foreground))",
	to = "hsl(var(--foreground))",
	disabled = false,
}: GlowingEffectProps) {
	const ref = useRef<HTMLDivElement>(null);
	const hasFinePointer = useHasFinePointer();
	const isEnabled = hasFinePointer === true && !disabled;

	useEffect(() => {
		if (!isEnabled) return;

		let frame = 0;
		let latest: { x: number; y: number } | null = null;

		/* Measured once per frame at most, and never inside the event handler. */
		const apply = () => {
			frame = 0;
			const element = ref.current;
			if (!element || !latest) return;

			const rect = element.getBoundingClientRect();
			const isNear =
				latest.x > rect.left - proximity &&
				latest.x < rect.right + proximity &&
				latest.y > rect.top - proximity &&
				latest.y < rect.bottom + proximity;

			element.style.setProperty("--glow-opacity", isNear ? "1" : "0");
			if (!isNear) return;

			element.style.setProperty("--glow-x", `${latest.x - rect.left}px`);
			element.style.setProperty("--glow-y", `${latest.y - rect.top}px`);
		};

		const handleMove = (event: PointerEvent) => {
			latest = { x: event.clientX, y: event.clientY };
			if (!frame) frame = requestAnimationFrame(apply);
		};

		window.addEventListener("pointermove", handleMove, { passive: true });
		return () => {
			window.removeEventListener("pointermove", handleMove);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [isEnabled, proximity]);

	const glow = `radial-gradient(${spread}px circle at var(--glow-x, 50%) var(--glow-y, 0%), ${from}, ${to} 40%, transparent 68%)`;

	return (
		<div
			ref={ref}
			className={cn("relative", className)}
			style={{ padding: borderWidth, ["--glow-opacity" as keyof CSSProperties]: "0" } as CSSProperties}
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 rounded-[inherit] border border-border"
			/>
			{/* Touch devices can never light these up, so the layers are not created at all. */}
			{isEnabled && (
				<>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--glow-opacity)] transition-opacity duration-300"
						style={{ background: glow }}
					/>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -inset-1 rounded-[inherit] blur-md transition-opacity duration-300"
						style={{ background: glow, opacity: "calc(var(--glow-opacity) * 0.45)" }}
					/>
				</>
			)}
			<div className="relative h-full overflow-hidden rounded-[inherit] bg-background">
				{children}
			</div>
		</div>
	);
}
