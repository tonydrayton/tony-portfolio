import { useEffect, useState } from "react";

/** Tailwind's `md`. */
const MEDIUM_BREAKPOINT = 768;

/**
 * True at Tailwind's `md` and above, and `null` until measured.
 *
 * Callers should treat the unknown phase as small-screen, so a phone never
 * mounts the expensive branch even for a single frame. `useIsMobile` defaults
 * the other way, which is why it is not reused here.
 */
export function useIsMediumUp(): boolean | null {
	const [isMediumUp, setIsMediumUp] = useState<boolean | null>(null);

	useEffect(() => {
		const query = window.matchMedia(`(min-width: ${MEDIUM_BREAKPOINT}px)`);
		setIsMediumUp(query.matches);

		const onChange = (event: MediaQueryListEvent) => setIsMediumUp(event.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);

	return isMediumUp;
}
