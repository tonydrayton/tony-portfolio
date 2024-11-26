import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		// Did use to use auto-rows-[22rem]
		<div
			className={cn(
				"grid w-full grid-cols-3 gap-4",
				className,
			)}
		>
			{children}
		</div>
	);
};

const BentoCard = ({
	name,
	className,
	background,
	icon,
	description,
	href,
	cta,
	transitions = true,
}: {
	name: string;
	className: string;
	background?: ReactNode | undefined;
	icon: Record<string, any>;
	description: string;
	href: string;
	cta?: string;
	transitions?: boolean;
}) => (
	<div
		key={name}
		className={cn(
			"group relative flex flex-col justify-between overflow-hidden rounded-xl transition-shadow duration-300 ease-in-out bg-white dark:bg-[var(--color-background)] border-[1px] border-neutral-200 dark:[border:1px_solid_rgba(255,255,255,.1)] ",
			transitions && "transform-gpu [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:hover:[box-shadow:0_-20px_20px_-20px_#ffffff1f_inset]",
			className,
		)}
	>
		{background && <div>{background}</div>}
		<div className={cn("pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300",
			cta && transitions && "group-hover:-translate-y-10"

		)}>
			{<icon.element
			className={cn(
				"h-12 w-12 origin-left text-neutral-700",
				transitions && "group-hover:scale-75 transition-all duration-300 ease-in-out transform-gpu",
				icon.className ? icon.className : ""
			)}
			{...icon.props}
			/>}
			<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
				{name}
			</h3>
			<p className="max-w-lg text-neutral-600 dark:text-neutral-400">{description}</p>
		</div>

		{cta &&
			<div
				className={cn(
					"pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
				)}
			>
				<Button variant="ghost" asChild size="sm" className="pointer-events-auto">
					<a href={href}>
						{cta}
						<ArrowRightIcon className="ml-2 h-4 w-4" />
					</a>
				</Button>
			</div>
		}
		<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
	</div>
);

export { BentoCard, BentoGrid };
