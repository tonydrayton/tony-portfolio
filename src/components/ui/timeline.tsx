"use client";
import {
	useMotionValueEvent,
	useScroll,
	useTransform,
	motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "./badge";
import { IconType } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";

interface TimelineEntry {
	logo?: string;
	title: string;
	workplace: { name: string; url: string };
	date: string;
	skills: { icon: JSX.Element; name: string }[];
	content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
	const ref = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			setHeight(rect.height);
		}
	}, [ref]);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 10%", "end 50%"],
	});

	const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
	const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

	return (
		<div ref={ref} className="relative w-full max-w-7xl mx-auto pb-20">
			{data.map((item, index) => (
				<div
					key={index}
					className="flex justify-start pt-10 md:pt-40 md:gap-10"
				>
					<div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
						<div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-[var(--color-background)] flex items-center justify-center">
							<div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
						</div>
						<div className="flex flex-col md:pl-20">

							<h3 className="hidden md:block text-lg">
								{item.title}{" @ "}
								<Link href={item.workplace.url} target="_blank" className="hover:brightness-150 underline">
									{item.workplace.name}
								</Link>
							</h3>
							<h3 className="hidden md:block text-base md:text-base text-muted-foreground mb-2">
								{item.date}
							</h3>
							<div className="hidden md:block">
								{item.skills.map((skill, index) => (
									<Badge key={index} className="m-1 transition-all duration-300 dark:border-neutral-700" variant="secondary">
										{skill.icon} {skill.name}
									</Badge>
								))}
							</div>
						</div>
					</div>

					<div className="relative pl-20 pr-4 md:pl-4 w-full">
						<h3 className="block md:hidden text-lg">
							{item.title}{" @ "}
							<Link href={item.workplace.url} target="_blank" className="hover:brightness-150 underline">
								{item.workplace.name}
							</Link>
						</h3>
						<h3 className="md:hidden block text-base text-left text-neutral-500 mb-2">
							{item.date}
						</h3>
						<div className="md:hidden block mb-4">
							{item.skills.map((skill, index) => (
								<Badge key={index} className="mr-2 mb-2 dark:border-neutral-700" variant="secondary">
									{skill.icon}  {skill.name}
								</Badge>
							))}
						</div>
						{item.content}{" "}
					</div>
				</div>
			))}
			<div
				style={{
					height: height + "px",
				}}
				className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
			>
				<motion.div
					style={{
						height: heightTransform,
						opacity: opacityTransform,
					}}
					className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-neutral-800 via-neutral-400 to-transparent from-[0%] via-[10%] rounded-full"
				/>
			</div>
		</div>
	);
};
