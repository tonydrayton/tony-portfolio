"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type VisualPhase = "idle" | "playing" | "settled";

/**
 * Runs a visual's motion exactly once, then holds a static final frame.
 *
 * Looping animation is the reason these cards were unusable on mobile: the cost
 * never ends, however cheap each frame is. Playing once and settling means the
 * section is completely idle a few seconds after it is read, while a visitor
 * still sees the graphic move when they arrive at it.
 *
 * Reduced motion goes straight to the settled frame, so the card still shows its
 * finished composition rather than an empty starting state.
 */
export function usePlayOnce(active: boolean, playMs: number): VisualPhase {
	const prefersReducedMotion = useReducedMotion();
	const [phase, setPhase] = useState<VisualPhase>("idle");
	const hasStarted = useRef(false);
	const timer = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		if (prefersReducedMotion) {
			setPhase("settled");
			return;
		}
		if (!active || hasStarted.current) return;

		/*
		 * The latch lives in a ref and the timer is cleared only on unmount. Both
		 * details matter: keying this off `phase` would let the state change
		 * re-run the effect and cancel the timer that advances it, and clearing
		 * on `active` would strand a card mid-play when it scrolls out of view.
		 */
		hasStarted.current = true;
		setPhase("playing");
		timer.current = setTimeout(() => setPhase("settled"), playMs);
	}, [active, playMs, prefersReducedMotion]);

	useEffect(() => () => clearTimeout(timer.current), []);

	return phase;
}
