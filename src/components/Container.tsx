import { cn } from "@/lib/utils";
import { ReactNode } from "react";

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

export default Container;
