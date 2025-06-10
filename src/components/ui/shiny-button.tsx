"use client";

import React from "react";
import {
	motion,
	type AnimationProps,
	type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
	initial: { "--x": "100%", scale: 1 },
	animate: { "--x": "-100%", scale: 1 },
	whileTap: { scale: 0.95 },
	transition: {
		repeat: Infinity,
		repeatType: "loop",
		repeatDelay: 1,
		type: "spring",
		stiffness: 20,
		damping: 15,
		mass: 2,
		scale: {
			type: "spring",
			stiffness: 200,
			damping: 5,
			mass: 0.5,
		},
	},
} as AnimationProps;

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
	children: React.ReactNode;
	className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
	({ children, className, ...props }, ref) => {
		return (
			<motion.button
				ref={ref}
				{...animationProps}
				{...props}
				className={cn(
					"relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-sm dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]",
					className,
				)}
			>
				<span
					className="relative flex flex-row items-center gap-3 size-full text-sm tracking-wide text-[rgb(0,0,0,100%)] dark:font-light dark:text-[rgb(255,255,255,100%)]"
					style={{
						maskImage:
							"linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
					}}
				>
					{children}
				</span>
				<span
					style={{
						mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
						maskComposite: "exclude",
					}}
					className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
				></span>
			</motion.button>
		);
	},
);

ShinyButton.displayName = "ShinyButton";
interface ShinyAnchorProps extends HTMLMotionProps<"a"> {
	children: React.ReactNode;
	className?: string;
}

export const ShinyAnchor = React.forwardRef<HTMLAnchorElement, ShinyAnchorProps>(
	({ children, className, ...props }, ref) => {
		return (
			<motion.a
				ref={ref}
				{...animationProps}
				{...props}
				className={cn(
					"relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-110 shadow-sm dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]",
					className,
				)}
			>
				<span
					className="relative size-full text-sm tracking-wide text-[rgb(0,0,0,100%)] dark:font-light dark:text-[rgb(255,255,255,100%)] flex flex-row items-center gap-4"
					style={{
						maskImage:
							"linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
					}}
				>
					{children}
				</span>
				<span
					style={{
						mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
						maskComposite: "exclude",
					}}
					className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
				></span>
			</motion.a>
		);
	},
);

ShinyAnchor.displayName = "ShinyAnchor";
