import { AnimatedBeam } from '@/components/ui/animated-beam';
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/ui/terminal';
import { Typewriter } from '@/components/ui/typewriter';
import { useIsMobile, useWindowSize } from '@/hooks';
import { MinimumWidth } from '@/lib/types';
import { cn } from '@/lib/utils';
import { SiAmazonwebservices, SiMailgun, SiReact, SiTypescript, SiTypescriptHex } from '@icons-pack/react-simple-icons';
import { motion, stagger, useAnimate, useAnimation, useInView } from 'framer-motion';
import { CircleFadingArrowUpIcon, CircleXIcon, CircleCheckIcon, DatabaseIcon, LoaderCircleIcon, MailOpenIcon, HeartPlusIcon, FlaskConical, WifiCogIcon, PlusIcon, TriangleAlertIcon, CheckIcon, UnplugIcon, ArrowRight, RouterIcon, SmartphoneIcon, TvMinimalIcon, SignalIcon, LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useId, useRef, useState, useMemo } from 'react';
import React from 'react';
import { FeatureCard, FeatureCardGrid, FeatureCardHeader, FeatureCardText } from '../ui/feature-card';
import { LoadingDots } from '@/components/ui/loading-dots';
import { TextAnimate } from '@/components/ui/text-animate';
import MacCursor from '@/components/ui/mac-cursor';
import { Badge } from '../ui/badge';

const IntegrationCard = React.forwardRef<HTMLDivElement, {
	children: React.ReactNode;
	className?: string;
	position?: 'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom';
	isCenter?: boolean;
}>((props, forwardedRef) => {
	const { children, className, position, isCenter = false } = props;
	return (
		<div ref={forwardedRef} className={cn('z-20 bg-neutral-100 dark:bg-neutral-900 relative flex size-12 rounded-xl border border-border dark:border-white/25 shadow', className)}>
			<div className={cn('relative z-20 m-auto size-fit *:size-6', isCenter && '*:size-8')}>{children}</div>
		</div>
	)
});

IntegrationCard.displayName = 'IntegrationCard';

export function AnimatedDBCard() {
	const motionControls = useAnimation();
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.5, once: true });
	const windowSize = useWindowSize();
	const isDesktop = windowSize.width >= MinimumWidth.Medium;

	const [wasHovered, setWasHovered] = useState(false);
	const [showMacTyping, setShowMacTyping] = useState(false);
	const [showModelTyping, setShowModelTyping] = useState(false);
	const [showButtonSubmitting, setShowButtonSubmitting] = useState(false);
	const animationRef = useRef({ isAnimating: false, timeouts: [] } as { isAnimating: boolean, timeouts: NodeJS.Timeout[] });

	const isAnimationOkay = () => {
		if (isDesktop && wasHovered && ref.current) {
			return true;
		} else if (!isDesktop && isInView && ref.current) {
			return true;
		}
		return false;
	}

	const keyframes = [
		{ scale: 1.5, translateX: 100, translateY: 100 },
		{ scale: 1.5, translateY: -70 }
	];

	const clearAllTimeouts = () => {
		animationRef.current.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
		animationRef.current.timeouts = [];
	};

	const createTimeout = (callback: (value: unknown) => any, delay: number) => {
		const timeoutId = setTimeout(callback, delay);
		animationRef.current.timeouts.push(timeoutId);
		return timeoutId;
	};

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
			if (animationRef.current.isAnimating || !isAnimationOkay()) {
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

				if (!ref.current) {
					resetAnimation();
					return;
				}

				setShowMacTyping(true);

				await new Promise(resolve => {
					createTimeout(resolve, 1200);
				});

				if (!ref.current) {
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

				if (!ref.current) {
					resetAnimation();
					return;
				}

				setShowModelTyping(true);

				await new Promise(resolve => {
					createTimeout(resolve, 1200);
				});

				if (!ref.current) {
					resetAnimation();
					return;
				}

				setShowButtonSubmitting(true);

				await new Promise(resolve => {
					createTimeout(resolve, 2000);
				});

				if (!ref.current) {
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
				animationRef.current.isAnimating = false;
			}
		};

		if (!animationRef.current.isAnimating) {
			runAnimation();
		}

		return () => {
			resetAnimation();
		};
	}, [isInView, isDesktop, wasHovered, motionControls]);


	return (
		<FeatureCard onMouseEnter={() => isDesktop && setWasHovered(true)}>
			<FeatureCardGrid className="-top-40 left-1/2" />
			<FeatureCardHeader>
				<DatabaseIcon className="h-5 w-5" />
				<p className="text-lg font-medium">Cassandra Database UI</p>
			</FeatureCardHeader>
			<FeatureCardText>
				Developed an interface that queries our Cassandra database for specific devices and displays their data in a humanly readable format
			</FeatureCardText>
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
		</FeatureCard>
	)
}

export function MailCard() {
	const fromRef = useRef<HTMLDivElement>(null);
	const toRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<FeatureCard>
			<FeatureCardGrid className="-top-[7.5rem] left-5/12" />
			<FeatureCardHeader>
				<MailOpenIcon className="h-5 w-5" />
				<p className="text-lg font-medium">Mail Webhook Handler</p>
			</FeatureCardHeader>
			<FeatureCardText>
				Designed and implemented a webhook mail handler (AWS Lambda function) using the Mailgun API, which handles all transactional and event mail for the platform
			</FeatureCardText>
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
		</FeatureCard>
	)
}

export function EventsCard() {
	const [scope, animate] = useAnimate();
	const [isHovered, setIsHovered] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [chatVisible, setChatVisible] = useState(false);
	const [showAgentTyping, setShowAgentTyping] = useState(false);
	const [showAgentResponse, setShowAgentResponse] = useState(false);
	const [showCursor, setShowCursor] = useState(false);
	const [animationStarted, setAnimationStarted] = useState(false);
	const [cursorClicked, setCursorClicked] = useState(false);
	const windowSize = useWindowSize();
	const isDesktop = windowSize.width >= MinimumWidth.Medium;
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.8 });

	const startAgentTyping = async () => {
		setShowAgentTyping(true);

		await new Promise(resolve => setTimeout(resolve, 50));

		await animate(`.agent-typing-container`, {
			opacity: 1,
			filter: "blur(0px)",
			transform: "translateY(0)",
			display: "flex"
		}, { duration: 0.5, ease: "easeInOut" });

		await new Promise(resolve => setTimeout(resolve, 2500));

		setShowAgentTyping(false);
		setShowAgentResponse(true);

		await new Promise(resolve => setTimeout(resolve, 50));

		await animate(`.agent-chat-container`, {
			opacity: 1,
			filter: "blur(0px)",
			transform: "translateY(0)",
			display: "flex"
		}, { duration: 0.5, ease: "easeInOut" });

		setIsAnimating(false);
	};

	const startAnimation = async () => {
		if (animationStarted) return;

		setAnimationStarted(true);
		setIsAnimating(true);

		setShowCursor(true);
		await new Promise(resolve => setTimeout(resolve, 50));

		await animate(`.mac-cursor`, {
			x: 175,
			y: 5,
			opacity: 1
		}, { duration: 0.75, ease: "easeInOut" });

		await new Promise(resolve => setTimeout(resolve, 500));

		await animate(`.mac-cursor`, {
			opacity: 0,
		}, { duration: 0.3 });
		
		setCursorClicked(true);
		
		await animate(`.open-chat`, {
			opacity: 0,
			filter: "blur(10px)",
		}, { duration: 0.5, ease: "easeInOut" });
		
		setShowCursor(false);
		setChatVisible(false);
		setShowAgentTyping(false);
		setShowAgentResponse(false);

		await new Promise(resolve => setTimeout(resolve, 100));

		setChatVisible(true);

		animate(`.user-chat-container`, {
			opacity: 1,
			filter: "blur(0px)",
			transform: "translateY(0)",
			display: "flex"
		}, { duration: 0.5, ease: "circIn" });
	};

	useEffect(() => {
		if (isDesktop && isHovered && !animationStarted) {
			startAnimation();
		} else if (!isDesktop && isInView && !animationStarted) {
			startAnimation();
		}
	}, [isDesktop, isHovered, isInView, animationStarted]);

	return (
		<FeatureCard ref={ref} onMouseEnter={() => isDesktop && setIsHovered(true)}>
			<FeatureCardGrid className="-top-40 left-1/3" />
			<FeatureCardHeader>
				<HeartPlusIcon className="h-5 w-5" />
				<p className="text-lg font-medium">Support Staff</p>
			</FeatureCardHeader>
			<FeatureCardText>
				{"Provided on-site support at prestigious alumni events including UPenn's Alumni Weekend and Drexel's 50-year Class of 1973 reunion, while managing customer support tickets to ensure seamless event experiences"}
			</FeatureCardText>
			<motion.ul
				ref={scope}
				className={cn("min-h-32 relative mx-auto items-center flex flex-col gap-6 select-none", isAnimating && "pointer-events-none")}
			>
				{showCursor && (
					<motion.div
						className="mac-cursor absolute top-9 left-0 z-20"
						initial={{ x: 0, y: 50, opacity: 0 }}
					>
						<MacCursor />
					</motion.div>
				)}
				<motion.button
					onClick={() => {
						if (!animationStarted) {
							startAnimation();
						}
					}}
					className={cn(
						"open-chat group relative w-36 cursor-pointer overflow-hidden rounded-full border shadow bg-linear-to-b from-background to-foreground/5 p-2 text-center absolute top-9 z-10",
						animationStarted && "pointer-events-none"
					)}
				>
					<motion.span 
						className="inline-block ml-2"
						animate={{
							x: cursorClicked ? 48 : 4,
							opacity: cursorClicked ? 0 : 1
						}}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						Open Chat
					</motion.span>
					<motion.div 
						className="absolute top-0 z-10 flex h-full w-full items-center justify-center gap-2 text-primary-foreground"
						animate={{
							x: cursorClicked ? -4 : 48,
							opacity: cursorClicked ? 1 : 0
						}}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<span>Open Chat</span>
						<ArrowRight className="size-4" />
					</motion.div>
					<motion.div 
						className="absolute size-2 rounded-lg bg-primary"
						animate={cursorClicked ? {
							left: "0%",
							top: "0%",
							height: "100%",
							width: "100%",
							scale: 1.8
						} : {
							left: "15%",
							top: "40%",
							height: "8px",
							width: "8px",
							scale: 1
						}}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					/>
				</motion.button>
				<motion.li className="user-chat-container hidden w-full flex-row gap-2 items-center justify-end px-2" initial={{ filter: "blur(10px)", opacity: 0, transform: "translateY(50px)" }}>
					<div className="w-fit shadow border border-border rounded-xl p-2 bg-background flex items-center">
						{chatVisible && (
							<TypingAnimation
								className="text-xs"
								onAnimationComplete={startAgentTyping}
							>
								{"Our event website is experiencing issues for attendees"}
							</TypingAnimation>
						)}
					</div>
					<div className="border border-border rounded-full h-10 w-10 overflow-hidden">
						<Image
							src="/person-2.webp"
							alt='Person'
							width={216}
							height={252}
							className='object-cover pointer-events-none select-none'
						/>
					</div>
				</motion.li>
				{showAgentTyping && (
					<motion.li className="agent-typing-container flex flex-row gap-2 w-full justify-start items-center mb-4 px-2" style={{ filter: "blur(10px)", opacity: 0, transform: "translateY(50px)" }}>
						<div className="border border-border rounded-full h-10 w-10 overflow-hidden">
							<Image
								src="/logos/alumniq_logo.png"
								alt='AlumnIQ Logo'
								width={216}
								height={252}
								className='object-cover pointer-events-none select-none'
							/>
						</div>
						<div className="shadow border border-border rounded-xl p-2 bg-border/70 flex items-center gap-2">
							<LoadingDots className="w-fit" spaceRatio={0.5} />
							<p className="text-xs text-muted-foreground">Agent is typing...</p>
						</div>
					</motion.li>
				)}
				{showAgentResponse && (
					<motion.li className="agent-chat-container flex flex-row gap-2 w-full justify-start items-center mb-4 px-2" style={{ filter: "blur(10px)", opacity: 0, transform: "translateY(50px)" }}>
						<div className="border border-border rounded-full h-10 w-10 overflow-hidden">
							<Image
								src="/logos/alumniq_logo.png"
								alt='AlumnIQ Logo'
								width={216}
								height={252}
								className='object-cover pointer-events-none select-none'
							/>
						</div>
						<div className="shadow border border-border rounded-xl p-2 bg-border/70">
							<p className="text-xs">{"We've identified the issue and are deploying a fix"}</p>
						</div>
					</motion.li>
				)}
			</motion.ul>
		</FeatureCard>
	)
}

export function UpdateFunctionsCard() {
	const [scope, animate] = useAnimate();
	const [isHovered, setIsHovered] = useState(false);
	const windowSize = useWindowSize();
	const isDesktop = windowSize.width >= MinimumWidth.Medium;
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 1, once: true });
	const ranAnimation = useRef(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const functions = useMemo(() => [
		{ name: "query.ts", status: "error" },
		{ name: "auth.ts", status: "error" },
		{ name: "api.ts", status: "error" },
	], []);

	const animateFunction = async (index: number) => {
		if (index >= functions.length) return;

		await animate(`.function${index}-container`, {
			filter: "blur(0px)",
			transform: `translateY(${index * 5}px) scale(1)`,
			zIndex: 5
		}, { duration: 0.3 });

		await animate(`.function${index}-error`, {
			display: "none"
		}, { duration: 0 });

		await animate(`.function${index}-loader`, {
			opacity: 1,
			display: "block"
		}, { duration: 1 });

		await animate(`.function${index}-name`, {
			color: "#00c951"
		}, {
			duration: 0.25,
			delay: 3,
		});

		await animate(`.function${index}-loader`, {
			opacity: 0,
			display: "none"
		}, { duration: 0 });

		await animate(`.function${index}-success`, {
			opacity: 1,
			display: "block"
		}, { duration: 0.25 });

		await animate(`.function${index}-state`, {
			opacity: 1,
			filter: "blur(0px)"
		}, { duration: 0.25 });

		if (index + 1 < functions.length) {
			await animate(`.function${index}-container`, {
				transform: `translateY(0px) scale(${0.80 + (index * 0.05)})`,
				filter: "blur(1px)",
				zIndex: index
			}, { duration: 0.3, delay: 1 });

			setTimeout(() => {
				animateFunction(index + 1);
			}, 750);
		} else {
			for (let i = 0; i < functions.length; i++) {
				await animate(`.function${i}-container`, {
					transform: `translateY(${i * 5}px)`,
					filter: "blur(0px)",
					zIndex: 5 - i
				}, { duration: 0.3, delay: (functions.length - 1 - i) * 0.1 });
			}
		}

		setCurrentIndex(index + 1);
	};

	useEffect(() => {
		if (isDesktop && isHovered && !ranAnimation.current) {
			ranAnimation.current = true;
			animateFunction(currentIndex);
		} else if (!isDesktop && isInView && !ranAnimation.current) {
			ranAnimation.current = true;
			animateFunction(currentIndex);
		}
	}, [scope, animate, isHovered, isDesktop, isInView, currentIndex]);

	return (
		<FeatureCard ref={ref} onMouseEnter={() => isDesktop && setIsHovered(true)}>
			<FeatureCardGrid className="-top-40 left-1/3" />
			<FeatureCardHeader>
				<CircleFadingArrowUpIcon className="h-5 w-5" />
				<p className="text-lg font-medium">Updated Functions</p>
			</FeatureCardHeader>
			<FeatureCardText>
				{"Modernized AWS Lambda infrastructure by migrating 100+ functions from CommonJS to ESM, upgrading to Node.js 20 LTS, and replacing legacy dependencies with modern alternatives to improve performance and maintainability"}
			</FeatureCardText>
			<motion.div ref={scope} className="pointer-events-none select-none relative mx-auto w-fit items-center flex flex-col mb-6">
				{functions.map((func, index) => (
					<div key={index} className={`function${index}-container flex flex-row gap-2 items-center`}
						style={{
							transform: index === 0 ? 'translateY(0) scale(1)' : `translateY(-${(index * 5) / 4}rem) scale(${1 - (index * 0.05)})`,
							filter: index === 0 ? 'blur(0px)' : 'blur(1px)',
							zIndex: functions.length - index
						}}>
						<div className="border border-border rounded-lg bg-background p-2 flex flex-row gap-2">
							<SiTypescript className="h-4 w-4" fill={SiTypescriptHex} />
							<p className={`text-xs font-mono function${index}-name`} style={{ color: "#fb2c36" }}>{func.name}</p>
							<CircleXIcon className={`h-4 w-4 text-red-500 function${index}-error`} />
							<LoaderCircleIcon className={`h-4 w-4 animate-spin function${index}-loader`} style={{ opacity: 0, display: "none" }} />
							<CircleCheckIcon className={`h-4 w-4 text-green-500 function${index}-success`} style={{ opacity: 0, display: "none" }} />
						</div>
						<p className={`text-xs text-green-500 function${index}-state`} style={{ opacity: 0, filter: "blur(10px)" }}>update successful</p>
					</div>
				))}
			</motion.div>
		</FeatureCard>
	)
}

export function TestsCard() {
	const [startTests, setStartTests] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [typingComplete, setTypingComplete] = useState(false);
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.5, once: true });
	const isMobile = useIsMobile();

	useEffect(() => {
		if (isMobile && isInView && typingComplete) {
			setStartTests(true);
		} else if (!isMobile && isHovered && typingComplete) {
			setStartTests(true);
		}
	}, [isInView, isMobile, isHovered, typingComplete]);

	return (
		<FeatureCard ref={ref} onMouseEnter={() => !isMobile && setIsHovered(true)}>
			<FeatureCardGrid className="-top-[7.5rem] left-5/12" />
			<FeatureCardHeader>
				<FlaskConical className="h-5 w-5" />
				<p className="text-lg font-medium">Comprehensive Testing</p>
			</FeatureCardHeader>
			<FeatureCardText>
				Added over 300 tests across various platform services, ensuring code reliability and preventing regressions with comprehensive unit, integration, and end-to-end tests
			</FeatureCardText>
			<div className="overflow-hidden mask-b-from-95% relative">
				<div className="pointer-events-none select-none translate-x-10 translate-y-4 h-40 relative">
					<Terminal className="absolute inset-0">
						<TypingAnimation onAnimationComplete={() => setTypingComplete(true)}>&gt; make test</TypingAnimation>
						{startTests && (
							<>
								<AnimatedSpan className="flex flex-row gap-1" >
									<span className="bg-green-500/50 dark:bg-green-500 text-black w-fit">PASS</span>
									<span className="">cool.test.js</span>
								</AnimatedSpan>
								<AnimatedSpan delay={500} className="text-green-500">
									<span>✔ Tony is a genius.</span>
								</AnimatedSpan>
								<AnimatedSpan delay={1000} className="text-green-500">
									<span>✔ Tony is awesome.</span>
								</AnimatedSpan>
								<AnimatedSpan delay={1500} className="text-green-500">
									<span>✔ Tony is great.</span>
								</AnimatedSpan>
								<AnimatedSpan delay={2000} className="flex flex-row gap-1">
									<span className="font-bold">Test suites:</span>
									<span className="text-green-500">3 passed,</span>
									<span className="">3 total</span>
								</AnimatedSpan>
								<AnimatedSpan delay={2500} className="flex flex-row gap-1">
									<span className="font-bold">Time:</span>
									<span className="text-yellow-600 dark:text-yellow-500">1.5s</span>
								</AnimatedSpan>

								<AnimatedSpan delay={3000} className="text-muted-foreground">
									<span>Done in 2.5s.</span>
								</AnimatedSpan>
							</>
						)}
					</Terminal>
				</div>
			</div>
		</FeatureCard>
	)
}

export function OnboardDeviceCard() {
	const [scope, animate] = useAnimate();
	const [isHovered, setIsHovered] = useState(false);
	const windowSize = useWindowSize();
	const isDesktop = windowSize.width >= MinimumWidth.Medium;
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.5, once: true });
	const ranAnimation = useRef(false);

	const [showStep1, setShowStep1] = useState(false);
	const [showStep2, setShowStep2] = useState(false);
	const [showStep3, setShowStep3] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [step1Complete, setStep1Complete] = useState(false);
	const [step2Complete, setStep2Complete] = useState(false);
	const [step3Complete, setStep3Complete] = useState(false);

	const [svgAnimationProgress, setSvgAnimationProgress] = useState(0);
	const [showCircle1, setShowCircle1] = useState(false);
	const [showCircle2, setShowCircle2] = useState(false);
	const [showCircle3, setShowCircle3] = useState(false);

	const runAnimationSequence = async () => {
		ranAnimation.current = true;

		setShowStep1(true);
		setSvgAnimationProgress(1);
		setShowCircle1(true);
		await new Promise(resolve => setTimeout(resolve, 2000));
		setStep1Complete(true);

		setSvgAnimationProgress(2);
		await new Promise(resolve => setTimeout(resolve, 2000));
		setShowStep2(true);
		setShowCircle2(true);
		await new Promise(resolve => setTimeout(resolve, 2000));
		setStep2Complete(true);

		setSvgAnimationProgress(3);
		await new Promise(resolve => setTimeout(resolve, 2000));
		setShowStep3(true);
		setShowCircle3(true);
		await new Promise(resolve => setTimeout(resolve, 2000));
		setStep3Complete(true);

		setSvgAnimationProgress(4);
		await new Promise(resolve => setTimeout(resolve, 1000));
		setShowSuccess(true);
	};

	useEffect(() => {
		if (isDesktop && isHovered && !ranAnimation.current) {
			runAnimationSequence();
		} else if (!isDesktop && isInView && !ranAnimation.current) {
			runAnimationSequence();
		}
	}, [scope, animate, isHovered, isDesktop, isInView]);

	return (
		<FeatureCard ref={ref} onMouseEnter={() => isDesktop && setIsHovered(true)}>
			<FeatureCardGrid className="-top-44 left-5/12" />
			<FeatureCardHeader>
				<UnplugIcon className="h-5 w-5" />
				<p className="text-lg font-medium">XLE Onboarding</p>
			</FeatureCardHeader>
			<FeatureCardText>
				Created a tool using Python and Flask that walks employees through onboarding new customer XLE devices to the Xfinity gateway
			</FeatureCardText>
			<div className="relative flex flex-row gap-2 items-start mb-4 pointer-events-none select-none">
				<div className="mt-8 ml-4 relative">
					<Image
						src="/assets/experience/xb8_device.png"
						alt="Xb8 Device"
						width={319}
						height={540}
						className="w-20 object-cover pointer-events-none select-none"
					/>
					<div className="inline-grid grid-cols-2 gap-2 text-xs">
						<p>WiFi:</p>
						{showSuccess ? <TextAnimate animation="blurIn" by="character" once className="font-mono text-indigo-600 dark:text-indigo-500">Home</TextAnimate> : <span className="font-mono text-indigo-600 dark:text-indigo-500">SETUP</span>}
					</div>
				</div>
				<div ref={scope} className="flex flex-col gap-2 relative">
					<div className="w-fit flex flex-row items-center gap-2 bg-gradient-to-b from-sky-500/10 to-sky-500/5 rounded-md py-2 px-3 border-t border-sky-500/30 shadow">
						<TriangleAlertIcon className="size-3 stroke-sky-500" />
						<p className="text-xs text-sky-500">XLE Device Detected</p>
					</div>
					<div className="ml-14 mt-4 flex flex-col gap-4">
						{showStep1 && (
							<div className="identifying-issue flex flex-row items-center gap-2">
								{!step1Complete && <LoadingDots className="w-fit" spaceRatio={0.5} />}
								{step1Complete && <CheckIcon className="size-3 stroke-lime-600 dark:stroke-lime-500" />}
								<TextAnimate
									key={step1Complete ? 'complete-1' : 'loading-1'}
									animation="blurIn"
									by="character"
									once
									className={cn("text-xs", step1Complete ? "text-lime-600 dark:text-lime-500" : "text-muted-foreground")}
								>
									{step1Complete ? "Fetched device information" : "Fetching device information"}
								</TextAnimate>
							</div>
						)}
						{showStep2 && (
							<div className="fetching-credentials flex flex-row items-center gap-2">
								{!step2Complete && <LoadingDots className="w-fit" spaceRatio={0.5} />}
								{step2Complete && <CheckIcon className="size-3 stroke-lime-600 dark:stroke-lime-500" />}
								<TextAnimate
									key={step2Complete ? 'complete-2' : 'loading-2'}
									animation="blurIn"
									by="character"
									once
									className={cn("whitespace-nowrap text-xs", step2Complete ? "text-lime-600 dark:text-lime-500" : "text-muted-foreground")}
								>
									{step2Complete ? "Created configuration set" : "Creating configuration set"}
								</TextAnimate>
							</div>
						)}
						{showStep3 && (
							<div className="reverting-configuration flex flex-row items-center gap-2">
								{!step3Complete && <LoadingDots className="w-fit" spaceRatio={0.5} />}
								{step3Complete && <CheckIcon className="size-3 stroke-lime-600 dark:stroke-lime-500" />}
								<TextAnimate
									key={step3Complete ? 'complete-3' : 'loading-3'}
									animation="blurIn"
									by="character"
									once
									className={cn("text-xs", step3Complete ? "text-lime-600 dark:text-lime-500" : "text-muted-foreground")}
								>
									{step3Complete ? "Connected to the gateway" : "Connecting to the gateway"}
								</TextAnimate>
							</div>
						)}
					</div>
					{showSuccess && (
						<motion.div
							initial={{ opacity: 0, }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.25, ease: "easeInOut" }}
							className="xle-onboarded absolute top-[9.55rem] left-4 w-fit flex flex-row items-center gap-2 bg-gradient-to-b from-lime-500/10 to-lime-500/5 rounded-md py-2 px-3 border-t border-lime-500/30 shadow"
						>
							<CheckIcon className="size-3 stroke-lime-600 dark:stroke-lime-500" />
							<p className="text-xs text-lime-600 dark:text-lime-500">
								Device Onboarded
							</p>
						</motion.div>
					)}
					<div className="absolute top-[2.1rem] left-6 w-full h-full">
						<svg width="23" height="120" viewBox="0 0 23 155" fill="none" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stopColor="#dadada" stopOpacity="0.5" />
									<stop offset="50%" stopColor="#e4e4e7" stopOpacity="0.5" />
									<stop offset="100%" stopColor="#e9e9eb" stopOpacity="0.2" />
								</linearGradient>
								<filter id="glow">
									<feGaussianBlur stdDeviation="2" result="coloredBlur" />
									<feMerge>
										<feMergeNode in="coloredBlur" />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
								</filter>
							</defs>

							<path
								d="M1 0V16L22.5 24.5V155"
								stroke="url(#lineGradient)"
								strokeWidth="2"
								fill="none"
								strokeDasharray="200"
								strokeDashoffset={svgAnimationProgress === 0 ? "200" :
									svgAnimationProgress === 1 ? "150" :
										svgAnimationProgress === 2 ? "100" :
											svgAnimationProgress === 3 ? "50" :
												svgAnimationProgress === 4 ? "0" : "200"}
								className="transition-all duration-1000 ease-in-out"
							/>

							{showCircle1 && (
								<circle
									cx="22.5"
									cy="40"
									r="3"
									className={cn("stroke-border/50", !step1Complete ? "fill-lime-600 dark:fill-lime-500 animate-pulse" : "fill-lime-600 dark:fill-lime-500")}
									strokeWidth="2"
								/>
							)}

							{showCircle2 && (
								<circle
									cx="22.5"
									cy="80"
									r="3"
									strokeWidth="2"
									className={cn("stroke-border/50", step1Complete && !step2Complete ? "fill-lime-600 dark:fill-lime-500 animate-pulse" : "fill-lime-600 dark:fill-lime-500")}
								/>
							)}

							{showCircle3 && (
								<circle
									cx="22.5"
									cy="122.5"
									r="3"
									strokeWidth="2"
									className={cn("stroke-border/50", step2Complete && !step3Complete ? "fill-lime-600 dark:fill-lime-500 animate-pulse" : "fill-lime-600 dark:fill-lime-500")}
								/>
							)}


						</svg>
					</div>
				</div>
			</div>
		</FeatureCard>
	)
}

export function ConfigFixCard() {
	return (
		<FeatureCard>
			<FeatureCardGrid className="-top-44 left-5/12" />
			<FeatureCardHeader>
				<WifiCogIcon className="h-5 w-5" />
				<p className="text-lg font-medium">WiFi Configuration Fix</p>
			</FeatureCardHeader>
			<FeatureCardText>
				Investigated and resolved a critical issue where customer WiFi devices were unexpectedly resetting to default network configurations
			</FeatureCardText>
			<div className="relative pointer-events-none select-none flex h-[10rem] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
				<div className="translate-x-10 translate-y-2 border border-border p-4 drop-shadow-md rounded-lg space-y-2 mask-b-from-5" style={{ background: "linear-gradient(134deg,hsla(0,0%,100%,.08),hsla(0,0%,100%,.02),hsla(0,0%,100%,0) 55%)" }}>
					<div className="grid grid-cols-2 gap-x-4">
						<p className="text-xs text-muted-foreground">Issue</p>
						<p className="text-xs text-muted-foreground">Progress</p>
					</div>
					<div className="grid grid-cols-2 gap-x-4">
						<p className="text-xs truncate">Devices unexpectedly reset to default network configurations</p>
						<p className="text-xs flex flex-row items-center gap-1"><CircleCheckIcon className="size-3 stroke-lime-600 dark:stroke-lime-500" />Resolved</p>
					</div>
					<div className="grid grid-cols-2 gap-x-4">
						<p className="text-xs truncate">Learning Swift to build mobile apps</p>
						<p className="text-xs flex flex-row items-center gap-1"><LoaderIcon className="size-3 stroke-indigo-600 dark:stroke-indigo-500" />In Progress</p>
					</div>
					<div className="grid grid-cols-2 gap-x-4">
						<p className="text-xs truncate">Solve every Leetcode hard problem</p>
						<p className="text-xs flex flex-row items-center gap-1"><LoaderIcon className="size-3 stroke-indigo-600 dark:stroke-indigo-500" />In Progress</p>
					</div>
					<div className="grid grid-cols-2 gap-x-4">
						<p className="text-xs truncate">Become a trillionaire</p>
						<p className="text-xs flex flex-row items-center gap-1"><LoaderIcon className="size-3 stroke-indigo-600 dark:stroke-indigo-500" />In Progress</p>
					</div>
				</div>

			</div>
		</FeatureCard>
	)
}
