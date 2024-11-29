"use client";

import { useRef } from "react";
import {
	AnimatePresence,
	motion,
	useInView
} from "framer-motion";

import type { UseInViewOptions, Variants } from "framer-motion";

type ViewportMargin = UseInViewOptions["margin"];

interface MotionBlurFadeProps {
	children: React.ReactNode;
	className?: string;
	animationVariants?: {
		hidden: { y: number };
		visible: { y: number };
	};
	animationDuration?: number;
	animationDelay?: number;
	verticalOffset?: number;
	isVisible?: boolean;
	viewportMargin?: ViewportMargin;
	blur?: string;
	style?: React.CSSProperties;
}

export default function MotionBlurFade({
	children,
	className,
	animationVariants,
	animationDuration = 0.4,
	animationDelay = 0,
	verticalOffset = 6,
	isVisible = false,
	viewportMargin = "-50px",
	blur = "6px",
	style
}: MotionBlurFadeProps) {
	const elementRef = useRef(null);
	const isInViewport = useInView(elementRef, { once: true, margin: viewportMargin });
	const shouldAnimate = !isVisible || isInViewport;

	const defaultMotionVariants: Variants = {
		hidden: { y: verticalOffset, opacity: 0, filter: `blur(${blur})` },
		visible: { y: -verticalOffset, opacity: 1, filter: `blur(0px)` },
	};

	const appliedVariants = animationVariants || defaultMotionVariants;

	return (
		<AnimatePresence>
			<motion.div
				ref={elementRef}
				initial="hidden"
				animate={shouldAnimate ? "visible" : "hidden"}
				exit="hidden"
				variants={appliedVariants}
				transition={{
					delay: 0.04 + animationDelay,
					duration: animationDuration,
					ease: "easeOut",
				}}
				className={className}
				style={style}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
