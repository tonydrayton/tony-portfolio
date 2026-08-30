"use client";

import Nav from "@/components/Nav";
import SocialSideNav from "@/components/social-side-nav";
import "../page.css";

/**
 * SideNav is deliberately left out: its shortcuts jump to home page sections
 * that do not exist here. SocialSideNav stays so the theme toggle and external
 * links remain reachable.
 */
export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Nav />
			<SocialSideNav />
			{children}
		</>
	);
}
