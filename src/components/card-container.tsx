import { cn } from "@/lib/utils";

export default function CardContainer({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn(
			//base styles
			"z-10 w-full h-full p-2 rounded-xl relative bg-background dark:bg-gradient-to-br backdrop-blur-md border backdrop-saturate-150 translate-z-0 will-change-transform",
			//light mode styles
			"text-black/90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/[0.02] before:to-black/[0.01] before:opacity-0 before:transition-opacity before:pointer-events-none ",
			//dark mode styles
			"dark:from-white/[0.08] border-black/[0.05] dark:border-white/[0.08] dark:text-white dark:to-transparent dark:before:from-white/[0.03] dark:before:to-white/[0.01] dark:hover:before:opacity-100",
			className
		)}>
			{children}
		</div>
	);
}
