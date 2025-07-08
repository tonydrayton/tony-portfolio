import { cn } from "@/lib/utils";
import { genRandomPattern, GridPattern } from "./grid-pattern";
import React from "react";

const p = genRandomPattern();

const FeatureCard = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
	({ children, className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("border border-border pt-4 rounded-lg bg-[linear-gradient(134deg,hsla(0,0%,100%,.08),hsla(0,0%,100%,.02),hsla(0,0%,100%,0)_55%)] shadow-sm md:max-w-sm relative overflow-hidden", className)} {...props}>
				{children}
			</div>
		)
	}
);

FeatureCard.displayName = 'FeatureCard';

function FeatureCardGrid() {
	return (
		<div className="select-none pointer-events-none absolute -top-[7.5rem] left-5/12 -mt-2 -ml-20 p-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
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
	)
}

function FeatureCardHeader({ children, className }: { children: React.ReactNode, className?: string }) {
	return (
		<div className={cn("flex flex-col px-4 gap-8", className)}>
			{children}
		</div>
	)
}

function FeatureCardText({ children, className }: { children: React.ReactNode, className?: string }) {
	return (
		<div className={cn("px-4 mt-1 mb-4", className)}>
			<p className="text-primary/80 text-balance text-sm">
				{children}
			</p>
		</div>
	)
}

export { FeatureCard, FeatureCardGrid, FeatureCardHeader, FeatureCardText };
