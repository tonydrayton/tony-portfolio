
/**
 * Author: Hamish Williams
 * https://github.com/HamishMW/portfolio
 */
import { useEffect, useState } from 'react';

export function useInViewport({
	elementRef,
	unobserveOnIntersect,
	options = {},
	shouldObserve = true
}: {
	elementRef: React.RefObject<HTMLElement>;
	unobserveOnIntersect?: boolean;
	options?: IntersectionObserverInit;
	shouldObserve?: boolean;
}) {
	const [intersect, setIntersect] = useState(false);
	const [isUnobserved, setIsUnobserved] = useState(false);

	useEffect(() => {
		if (!elementRef?.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			const { isIntersecting, target } = entry;

			setIntersect(isIntersecting);

			if (isIntersecting && unobserveOnIntersect) {
				observer.unobserve(target);
				setIsUnobserved(true);
			}
		}, options);

		if (!isUnobserved && shouldObserve) {
			observer.observe(elementRef.current);
		}

		return () => observer.disconnect();
	}, [elementRef, unobserveOnIntersect, options, isUnobserved, shouldObserve]);

	return intersect;
}
