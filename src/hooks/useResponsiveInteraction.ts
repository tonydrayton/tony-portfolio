import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useWindowSize } from './useWindowSize';
import { MinimumWidth } from '@/lib/types';

interface UseResponsiveInteractionOptions {
	/** The threshold for intersection observer (0-1) */
	threshold?: number;
	/** Whether the interaction should only trigger once */
	once?: boolean;
}

/**
 * A hook that returns true/false based on responsive interaction:
 * - On desktop: returns true when hovered
 * - On mobile: returns true when element is in view
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, onMouseEnter, isActive } = useResponsiveInteraction({
 *     threshold: 0.8, // Trigger when 80% in view on mobile
 *     once: false     // Can trigger multiple times
 *   });
 *   
 *   return (
 *     <div ref={ref} onMouseEnter={onMouseEnter}>
 *       <div className={isActive ? 'opacity-100' : 'opacity-50'}>
 *         Content that changes based on interaction
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @param options - Configuration options for the hook
 * @returns Object with ref, onMouseEnter handler, and isActive boolean
 */
export const useResponsiveInteraction = <T extends HTMLElement = HTMLDivElement>(
	options: UseResponsiveInteractionOptions = {}
) => {
	const { threshold = 0.5, once = false } = options;

	const [isHovered, setIsHovered] = useState(false);
	const ref = useRef<T>(null);

	const windowSize = useWindowSize();
	const isDesktop = windowSize.width >= MinimumWidth.Medium;
	const isInView = useInView(ref, { amount: threshold, once });

	const handleMouseEnter = () => {
		if (isDesktop) {
			setIsHovered(true);
		}
	};

	const handleMouseLeave = () => {
		if (isDesktop) {
			setIsHovered(false);
		}
	};

	const isActive = isDesktop ? isHovered : isInView;

	return {
		ref,
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		isActive,
		isDesktop,
		isInView,
		isHovered,
	};
}; 
