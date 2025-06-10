"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavItem {
	id: string;
	label: string;
	shortcut: number;
}

const navItems: NavItem[] = [
	{ id: "experience", label: "Experience", shortcut: 1 },
	{ id: "contact", label: "Contact", shortcut: 2 },
];

export default function SideNav() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			const sidebarElement = document.querySelector('.main-side-nav');
			let sidebarTop = windowHeight * 0.4;
			let sidebarBottom = windowHeight * 0.6;

			if (sidebarElement) {
				const rect = sidebarElement.getBoundingClientRect();
				sidebarTop = rect.top;
				sidebarBottom = rect.bottom;
			}

			const verticalBuffer = 100;
			const isInVerticalRange =
				e.clientY >= (sidebarTop - verticalBuffer) &&
				e.clientY <= (sidebarBottom + verticalBuffer);

			const isInHorizontalRange = e.clientX <= 150;

			if (isInHorizontalRange && isInVerticalRange) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const key = Number(e.key);
			const navItem = navItems.find(item => item.shortcut === key);

			if (navItem) {
				e.preventDefault();
				document.getElementById(navItem.id)?.scrollIntoView({ behavior: "smooth" });
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className="hidden 2xl:block fixed left-0 top-2/5 z-50 main-side-nav">
			<div
				className={cn(
					"bg-transparent py-4 px-2 rounded-r-lg",
					"transition-all duration-300",
				)}
			>
				<ul className="flex flex-col gap-3">
					{navItems.map((item) => (
						<li key={item.id}>
							<a
								href={isOpen ? `#${item.id}` : undefined}
								className={cn(
									"flex items-center gap-2 px-3 py-2 rounded-md border border-transparent text-sm !text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground group",
									"transition-all duration-300",
									isOpen
										? "hover:bg-accent/50 hover:backdrop-blur-md hover:border-border cursor-pointer"
										: "pointer-events-none opacity-50"
								)}
								onClick={(e) => {
									if (!isOpen) e.preventDefault();
								}}
							>
								<span className="group-hover:text-primary">{item.label}</span>

									<span className={cn("ml-auto text-xs text-muted-foreground px-1.5 py-0.5 rounded border border-neutral-700 transition-opacity opacity-0", isOpen && "opacity-100")}>
										{item.shortcut}
									</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
