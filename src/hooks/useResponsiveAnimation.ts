import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useWindowSize } from './useWindowSize';
import { MinimumWidth } from '@/lib/types';

interface UseResponsiveAnimationOptions {
	/** The threshold for intersection observer (0-1) */
	threshold?: number;
	/** Whether the animation should only trigger once */
	once?: boolean;
	/** Additional dependencies that should reset the animation */
	dependencies?: any[];
}

/**
 * A hook that triggers animations responsively:
 * - On desktop: triggers on hover
 * - On mobile: triggers when element comes into view
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [scope, animate] = useAnimate();
 *   
 *   const animateElements = async () => {
 *     await animate('.my-element', { opacity: 1, y: 0 });
 *   };
 *   
 *   const { ref, onMouseEnter } = useResponsiveAnimation(animateElements, {
 *     threshold: 0.8, // Trigger when 80% in view on mobile
 *     once: true      // Only animate once
 *   });
 *   
 *   return (
 *     <div ref={ref} onMouseEnter={onMouseEnter}>
 *       <div className="my-element opacity-0 translate-y-4">
 *         Content that will animate
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @param animationFunction - The function to call when animation should start
 * @param options - Configuration options for the hook
 * @returns Object with ref and onMouseEnter handler to attach to your component
 */
export const useResponsiveAnimation = <T extends HTMLElement = HTMLDivElement>(
	animationFunction: () => void | Promise<void>,
	options: UseResponsiveAnimationOptions = {}
) => {
	const { threshold = 0.5, once = true, dependencies = [] } = options;

	const [isHovered, setIsHovered] = useState(false);
	const ref = useRef<T>(null);
	const ranAnimation = useRef(false);

	const windowSize = useWindowSize();
	const isDesktop = windowSize.width >= MinimumWidth.Medium;
	const isInView = useInView(ref, { amount: threshold, once });

	useEffect(() => {
		if (dependencies.length > 0) {
			ranAnimation.current = false;
			setIsHovered(false);
		}
	}, [dependencies]);

	useEffect(() => {
		if (ranAnimation.current) return;

		const shouldAnimate = isDesktop ? isHovered : isInView;

		if (shouldAnimate && ref.current) {
			ranAnimation.current = true;
			animationFunction();
		}
	}, [isDesktop, isHovered, isInView, animationFunction]);

	const handleMouseEnter = () => {
		if (isDesktop && !ranAnimation.current) {
			setIsHovered(true);
		}
	};

	return {
		ref,
		onMouseEnter: handleMouseEnter,
		isDesktop,
		isInView,
		isHovered,
		hasAnimated: ranAnimation.current,
	};
}; 
