"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FileCheckIcon, Github, Linkedin, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

interface SocialItem {
	id: string;
	label: string;
	icon: JSX.Element;
	href: string;
}

const socialItems: SocialItem[] = [
	{
		id: "github",
		label: "GitHub",
		icon: <Github className="w-5 h-5" />,
		href: "https://github.com/tonydrayton"
	},
	{
		id: "linkedin",
		label: "LinkedIn",
		icon: <Linkedin className="w-5 h-5" />,
		href: "https://www.linkedin.com/in/tony-drayton/"
	},
	{
		id: "resume",
		label: "Resume",
		icon: <FileCheckIcon className="w-5 h-5" />,
		href: "/assets/resumes/Tony_Drayton_10_25_24.pdf"
	},
];

export default function SocialSideNav() {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			const sidebarElement = document.querySelector('.social-side-nav');
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

			const isInHorizontalRange = windowWidth - e.clientX <= 150;

			if (isInHorizontalRange && isInVerticalRange) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div className="hidden 2xl:block fixed right-0 top-2/5 z-50 social-side-nav">
			<div
				className={cn(
					"bg-transparent py-4 px-2 rounded-l-lg",
					"transition-all duration-300",
				)}
			>
				<ul className="flex flex-col gap-3">
					<li>
						<Button
							className={cn(
								"flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-accent-foreground group",
								"transition-all duration-300",
								isOpen
									? "hover:bg-accent cursor-pointer"
									: "pointer-events-none opacity-50"
							)}
							variant="ghost"
							onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
						>
							{isOpen && <p className="text-sm text-muted-foreground group-hover:text-primary">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</p>}
							<SunIcon className="size-5 hidden dark:block group-hover:text-primary" />
							<MoonIcon className="size-5 dark:hidden group-hover:text-primary" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</li>
					{socialItems.map((item) => (
						<li key={item.id}>
							<a
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								className={cn(
									"flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-accent-foreground group",
									"transition-all duration-300",
									isOpen
										? "hover:bg-accent cursor-pointer"
										: "pointer-events-none opacity-50"
								)}
							>
								{isOpen && <span className="group-hover:text-primary">{item.label}</span>}
								<span className="group-hover:text-primary">{item.icon}</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
