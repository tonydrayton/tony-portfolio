import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Container = ({ 
    children,
    className 
}: { 
    children: ReactNode 
    className?: string
}) => {
    return (
        <div className={cn("flex justify-center items-center w-full h-svh", className)}>
            {children}
        </div>
    );
};

export default Container;