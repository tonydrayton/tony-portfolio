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
	{ id: "about", label: "About", shortcut: 1 },
	{ id: "projects", label: "Projects", shortcut: 2 },
	{ id: "contact", label: "Contact", shortcut: 3 },
];

export default function SideNav() {
	const [isOpen, setIsOpen] = useState(false);

	// Handle mouse movement to detect left edge hover
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			// Open if mouse is within 10px of left edge
			console.log(e.clientX);
			if (e.clientX <= 100) {
				setIsOpen(true);
			} else if (e.clientX > 100) {
				// Close if mouse moves away from nav
				setIsOpen(false);
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	// Handle keyboard shortcuts
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
		<div className="hidden xl:block fixed left-0 top-2/5 z-50">
			<div
				// initial={{ x: -100 }}
				// animate={{ x: isOpen ? 0 : -60 }}
				// transition={{ duration: 0.3 }}
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
									"flex items-center gap-2 px-3 py-2 rounded-md text-sm !text-muted-foreground",
									"transition-all duration-300",
									isOpen
										? "hover:bg-accent hover:text-accent-foreground cursor-pointer"
										: "pointer-events-none opacity-50"
								)}
								onClick={(e) => {
									if (!isOpen) e.preventDefault();
								}}
							>
								<span>{item.label}</span>

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
