import { useEffect, useState } from "react";

/**
 * True only for devices with a real cursor, and `null` until that is known.
 *
 * Hover-driven effects should not just be visually skipped on touch, they should
 * not attach their listeners at all: `pointermove` fires throughout a touch
 * scroll, so any handler that measures layout turns every scroll into forced
 * synchronous layout.
 *
 * The `null` phase matters. Defaulting to a boolean would make the first client
 * render commit to one branch, so desktop would briefly run the touch path and
 * start an animation it immediately abandons. Reading the media query during
 * render instead would risk a hydration mismatch.
 */
export function useHasFinePointer(): boolean | null {
	const [hasFinePointer, setHasFinePointer] = useState<boolean | null>(null);

	useEffect(() => {
		const query = window.matchMedia("(hover: hover) and (pointer: fine)");
		setHasFinePointer(query.matches);

		const onChange = (event: MediaQueryListEvent) => setHasFinePointer(event.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);

	return hasFinePointer;
}
