// Author: https://www.josephcollicoat.com/articles/animating-text-with-the-intersection-observer-api-and-framer-motion
import { useAnimation, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function StaggeredText(
	{
		text,
		className
	}: {
		text: string,
		className?: string
	}) {
	const ctrls = useAnimation();
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });

	useEffect(() => {
		if (inView) {
			ctrls.start("visible");
		}
		if (!inView) {
			ctrls.start("hidden");
		}
	}, [ctrls, inView]);

	const wordAnimation = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				when: "beforeChildren",
				staggerChildren: 0.1,
			},
		},
	};

	const characterAnimation = {
		hidden: {
			opacity: 0,
			y: `0.25em`,
		},
		visible: {
			opacity: 1,
			y: `0em`,
			transition: {
				duration: 1,
				ease: [0.2, 0.65, 0.3, 0.9],
			},
		},
	};
	return (
		<p className={className}>
			{text.split(" ").map((word, index) => (
				<motion.span
					key={index}
					ref={ref}
					aria-hidden="true"
					initial="hidden"
					animate={ctrls}
					variants={wordAnimation}
					transition={{
						delayChildren: 0.1 * index,
						staggerChildren: 0.1,
					}}
					className="inline-block mr-2 whitespace-nowrap"
				>
					{word.split("").map((char, index) => (
						<motion.span
							aria-hidden="true"
							key={index}
							variants={characterAnimation}
							className="inline-block"
						>
							{char}
						</motion.span>
					))}
				</motion.span>
			))}
		</p>
	)
}
