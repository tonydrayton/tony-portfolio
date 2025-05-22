import { cn } from "@/lib/utils";

export default function ParagraphText({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<p className={cn("text-base sm:text-base text-muted-foreground", className)}>
			{children}
		</p>
	);
}
