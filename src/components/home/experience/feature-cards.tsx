import { AnimatedBeam } from '@/components/ui/animated-beam';
import { TextGenerateEffect } from '@/components/ui/generate-effect';
import { Typewriter } from '@/components/ui/typewriter';
import { useWindowSize } from '@/hooks';
import { MinimumWidth } from '@/lib/types';
import { cn } from '@/lib/utils';
import { SiAmazonwebservices, SiMailgun, SiMailgunHex, SiReact, SiReactHex } from '@icons-pack/react-simple-icons';
import { motion, stagger, useAnimate, useAnimation, useInView } from 'framer-motion';
import { DatabaseIcon, LoaderCircleIcon, MailOpenIcon, TicketsIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import React from 'react';

// export function FeatureCard({ feature, className, ...props }: FeatureCardPorps) {
// 	const p = genRandomPattern();

// 	return (
// 		<div className={cn('relative overflow-hidden p-6', className)} {...props}>
// 			<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
// 				<div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
// 					<GridPattern
// 						width={20}
// 						height={20}
// 						x="-12"
// 						y="4"
// 						squares={p}
// 						className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
// 					/>
// 				</div>
// 			</div>
// 			<feature.icon className="text-foreground/75 size-6" strokeWidth={1} aria-hidden />
// 			<h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
// 			<p className="text-muted-foreground relative z-20 mt-2 text-xs font-light">{feature.description}</p>
// 		</div>
// 	);
// }

const IntegrationCard = React.forwardRef<HTMLDivElement, {
	children: React.ReactNode;
	className?: string;
	position?: 'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom';
	isCenter?: boolean;
}>((props, forwardedRef) => {
	const { children, className, position, isCenter = false } = props;
	return (
		<div ref={forwardedRef} className={cn('z-50 bg-neutral-100 dark:bg-neutral-900 relative flex size-12 rounded-xl border border-border dark:border-white/25 shadow', className)}>
			<div className={cn('relative z-20 m-auto size-fit *:size-6', isCenter && '*:size-8')}>{children}</div>
		</div>
	)
});

IntegrationCard.displayName = 'IntegrationCard';

function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
	const patternId = useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y], index) => (
						<rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
					))}
				</svg>
			)}
		</svg>
	);
}

function genRandomPattern(length?: number): number[][] {
	length = length ?? 5;
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
		Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
	]);
}

const p = genRandomPattern()

export function AnimatedDBCard() {
	const motionControls = useAnimation();
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.5, once: true });

	const [showMacTyping, setShowMacTyping] = useState(false);
	const [showModelTyping, setShowModelTyping] = useState(false);
	const [showButtonSubmitting, setShowButtonSubmitting] = useState(false);
	const animationRef = useRef({ isAnimating: false, timeouts: [] } as { isAnimating: boolean, timeouts: NodeJS.Timeout[] });

	const keyframes = [
		{ scale: 1.5, translateX: 100, translateY: 100 },
		{ scale: 1.5, translateY: -70 }
	];

	// Function to clear all timeouts
	const clearAllTimeouts = () => {
		animationRef.current.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
		animationRef.current.timeouts = [];
	};

	// Function to create safe timeouts that can be tracked and cleared
	const createTimeout = (callback: (value: unknown) => any, delay: number) => {
		const timeoutId = setTimeout(callback, delay);
		animationRef.current.timeouts.push(timeoutId);
		return timeoutId;
	};

	// Reset animation state
	const resetAnimation = () => {
		clearAllTimeouts();
		animationRef.current.isAnimating = false;
		setShowMacTyping(false);
		setShowModelTyping(false);
		setShowButtonSubmitting(false);
		motionControls.stop();
	};

	useEffect(() => {
		const runAnimation = async () => {
			// Only run if not already animating and in view
			if (animationRef.current.isAnimating || !isInView || !ref.current) {
				return;
			}

			motionControls.set({
				scale: 1,
				translateX: 0,
				translateY: 0
			});

			animationRef.current.isAnimating = true;

			try {
				await motionControls.start({
					...keyframes[0],
					transition: {
						duration: 0.5,
						stiffness: 100,
						damping: 10,
					}
				});

				if (!isInView || !ref.current) {
					resetAnimation();
					return;
				}

				setShowMacTyping(true);

				await new Promise(resolve => {
					createTimeout(resolve, 1200);
				});

				if (!isInView || !ref.current) {
					resetAnimation();
					return;
				}
				await motionControls.start({
					...keyframes[1],
					transition: {
						duration: 0.5,
						stiffness: 100,
						damping: 10,
						delay: 0.5
					}
				});

				if (!isInView || !ref.current) {
					resetAnimation();
					return;
				}

				setShowModelTyping(true);

				await new Promise(resolve => {
					createTimeout(resolve, 1200);
				});

				if (!isInView || !ref.current) {
					resetAnimation();
					return;
				}

				setShowButtonSubmitting(true);

				await new Promise(resolve => {
					createTimeout(resolve, 2000);
				});

				if (!isInView || !ref.current) {
					resetAnimation();
					return;
				}

				setShowButtonSubmitting(false);

				await motionControls.start({
					scale: 1,
					translateX: 0,
					translateY: 0,
					transition: {
						duration: 0.5,
						stiffness: 100,
						damping: 10,
					}
				});

				await new Promise(resolve => {
					createTimeout(resolve, 1500);
				});
			} finally {
				// Reset animation state regardless of success or failure
				animationRef.current.isAnimating = false;

				// Don't loop automatically, wait for next inView trigger
			}
		};
		// Reset on out of view, start on in view
		if (!isInView) {
			resetAnimation();
		} else if (!animationRef.current.isAnimating) {
			runAnimation();
		}

		return () => {
			resetAnimation();
		};
	}, [isInView, motionControls]);


	return (
		<div className="border border-border pt-4 rounded-lg bg-background shadow-sm max-w-sm relative overflow-hidden">
			<div className="pointer-events-none absolute -top-40 left-2/3 -mt-2 -ml-20 p-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
				<div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
					<GridPattern
						width={20}
						height={20}
						x="-12"
						y="4"
						squares={p}
						className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
					/>
				</div>
			</div>
			<div className="flex flex-col px-4 gap-8">
				<DatabaseIcon className="h-5 w-5" />
				<p className="text-lg font-medium">Cassandra Database UI</p>
			</div>
			<div className="px-4">
				<p className="text-primary/80 text-sm mt-1 mb-4">Developed an interface that queries our Cassandra database for specific devices and displays their data in a humanly readable format</p>
			</div>
			<div className="overflow-hidden mask-b-from-95% mask-t-from-95%" aria-label='Cassandra Database UI Demo'>
				<motion.div
					ref={ref}
					animate={motionControls}
					initial={{
						scale: 1,
						translateX: 0,
						translateY: 0,
					}}
					className="border border-border shadow-sm p-4 rounded-xl bg-border/30 pointer-events-none select-none translate-x-10 translate-y-4 flex flex-col gap-2 relative"
				>
					<div className="absolute inset-[35%] block rounded-full bg-white/15 blur-3xl" />
					<p className="text-xs">Mac Address</p>
					<div className="border border-border bg-background rounded-lg p-2 text-xs">
						{showMacTyping ? (
							<Typewriter
								text="123456789ABC"
								speed={100}
								cursor="|"
								className="text-xs"
								loop={false}
								delay={1000}
							/>
						) : (
							<p className='text-muted-foreground'>Enter a mac address</p>
						)}
					</div>
					<p className="text-xs">Model</p>
					<div className="border border-border bg-background rounded-lg p-2 text-xs">
						{showModelTyping ? (
							<Typewriter
								text="XB10"
								speed={100}
								cursor="|"
								className="text-xs"
								loop={false}
								delay={1000}
							/>
						) : (
							<p className='text-muted-foreground'>Enter a device model</p>
						)}
					</div>
					<button
						className="flex flex-row justify-center items-center gap-2 disabled:opacity-50 my-4 bg-black dark:bg-white text-white dark:text-black rounded-lg p-2 text-xs"
						disabled={showButtonSubmitting}
					>
						{showButtonSubmitting && (
							<LoaderCircleIcon className="-ms-1 animate-spin" size={16} aria-hidden="true" />
						)}
						Search
					</button>
				</motion.div>
			</div>
		</div>
	)
}

export function MailCard() {
	const fromRef = useRef<HTMLDivElement>(null);
	const toRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div className="border border-border pt-4 rounded-lg bg-background shadow-sm max-w-sm relative overflow-hidden">
			<div className="pointer-events-none absolute -top-[7.5rem] left-5/12 -mt-2 -ml-20 p-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
				<div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
					<GridPattern
						width={20}
						height={20}
						x="-12"
						y="4"
						squares={p}
						className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
					/>
				</div>
			</div>
			<div className="flex flex-col px-4 gap-8">
				<MailOpenIcon className="h-5 w-5" />
				<p className="text-lg font-medium">Mail Webhook Handler</p>
			</div>
			<div className="px-4 mt-1 mb-4">
				<p className="text-primary/80 text-balance text-sm">Designed and implemented a webhook mail handler (AWS Lambda function) using the Mailgun API, which handles all transactional and event mail for the platform</p>
			</div>
			<div ref={containerRef} className="overflow-hidden relative mx-auto items-center flex justify-between pt-4 pb-10 px-6">
				<div className="space-y-6">
					<IntegrationCard ref={fromRef} position="left-middle">
						<SiReact className="h-10 w-10" />
					</IntegrationCard>
				</div>
				<div className="mx-20 flex justify-center">
					<IntegrationCard className="shadow-black-950/10 size-16 shadow-xl dark:border-white/25 dark:shadow-white/10" isCenter>
						<SiMailgun className="h-10 w-10" />
					</IntegrationCard>
				</div>
				<div className="space-y-6">
					<IntegrationCard ref={toRef} position="right-middle">
						<SiAmazonwebservices className="h-10 w-10" />
					</IntegrationCard>
				</div>

				<AnimatedBeam
					containerRef={containerRef}
					fromRef={fromRef}
					toRef={toRef}
					className="z-10 absolute inset-0"
					gradientStartColor='#FFFFFF'
					gradientStopColor='#565656'
					duration={5}
					delay={1}
				/>
				<div className="bg-radial absolute inset-0 z-10" />
			</div>
		</div>
	)
}

export function EventsCard() {
	const [scope, animate] = useAnimate();
	const [isHovered, setIsHovered] = useState(false);
	const windowSize = useWindowSize();
	const isDesktop = windowSize.width >= MinimumWidth.Medium;
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.5 });

	useEffect(() => {
		if (isDesktop) {
			if (isHovered) {
				animate(".chat-container", {
					opacity: 1,
					filter: "blur(0px)"
				}, {
					duration: 0.75,
					delay: stagger(1)
				});
			}
		} else if (isInView) {
			animate(".chat-container", {
				opacity: 1,
				filter: "blur(0px)"
			}, {
				duration: 0.75,
				delay: stagger(1)
			});
		}
	}, [scope, animate, isHovered, isDesktop, isInView]);

	return (
		<div
			ref={ref}
			className="border border-border pt-4 rounded-lg bg-background shadow-sm max-w-sm relative overflow-hidden"
			onMouseEnter={() => isDesktop && setIsHovered(true)}
			onMouseLeave={() => isDesktop && setIsHovered(false)}
		>
			<div className="pointer-events-none absolute -top-10 md:-top-20 left-1/3 -mt-2 -ml-20 p-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
				<div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
					<GridPattern
						width={20}
						height={20}
						x="-12"
						y="4"
						squares={p}
						className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
					/>
				</div>
			</div>
			<div className="flex flex-col px-4 gap-8">
				<TicketsIcon className="h-5 w-5" />
				<p className="text-lg font-medium">Events</p>
			</div>
			<div className="px-4 mt-1 mb-4">
				<p className="text-primary/80 text-balance text-sm">{"Went to in-person Alumni reunion events, such as the annual UPenn Alumni Weekend and Drexel's 50-year reunion of the Class of 1973 as support staff"}</p>
			</div>
			<motion.ul
				ref={scope}
				className="overflow-hidden relative mx-auto w-fit items-center flex flex-col gap-6"
			>
				<motion.li className="chat-container flex flex-row gap-4 items-center" style={{ filter: "blur(10px)", opacity: 0 }}>
					<div className="border border-border rounded-full h-10 w-10 overflow-hidden">
						<Image
							src="/person-2.webp"
							alt='Person'
							width={216}
							height={252}
							className='object-cover pointer-events-none select-none'
						/>
					</div>
					<div className="border border-border rounded-xl p-2 bg-background flex items-center">
						<p className="text-xs">Hi, could we get some help over at booth 3?</p>
					</div>
				</motion.li>
				<motion.li className="chat-container flex flex-row gap-4 w-full justify-end items-center mb-4" style={{ filter: "blur(10px)", opacity: 0 }}>
					<div className="border border-border rounded-xl p-2 bg-border/70">
						<p className="text-xs">{"Of course, we'll be right over."}</p>
					</div>
					<div className="border border-border rounded-full h-10 w-10 overflow-hidden">
						<Image
							src="/alumniq_logo.png"
							alt='AlumnIQ Logo'
							width={216}
							height={252}
							className='object-cover pointer-events-none select-none'
						/>
					</div>
				</motion.li>
			</motion.ul>
		</div>
	)
}
