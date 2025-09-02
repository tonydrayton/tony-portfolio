import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const ContainerContent = ({
	children,
	className,
	...props
}: {
	children: ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn("max-w-full w-full px-4 md:px-14 lg:max-w-4xl", className)} {...props}>
			<div className="mt-10 flex flex-col gap-2 w-full">
				{children}
			</div>
		</div>
	);
}

const Container = ({
	children,
	className,
	...props
}:
	React.HTMLAttributes<HTMLDivElement>
) => {
	return (
		<>
			<section className={cn("flex justify-center items-center w-full", className)} {...props}>
				{children}
			</section>
		</>
	);
};

export { Container, ContainerContent };
